import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GoogleCloudCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

async function getAccessToken(credentials: GoogleCloudCredentials) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: credentials.token_uri,
    exp: now + 3600,
    iat: now,
  };

  const header = { alg: 'RS256', typ: 'JWT' };
  
  // Create JWT
  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/[+/]/g, (m) => ({'+': '-', '/': '_'})[m]).replace(/=/g, '');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/[+/]/g, (m) => ({'+': '-', '/': '_'})[m]).replace(/=/g, '');
  
  const signatureInput = `${headerB64}.${payloadB64}`;
  
  // Import private key
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    new TextEncoder().encode(atob(credentials.private_key.replace(/-----[^-]+-----/g, '').replace(/\s/g, ''))),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    encoder.encode(signatureInput)
  );
  
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/[+/]/g, (m) => ({'+': '-', '/': '_'})[m])
    .replace(/=/g, '');
  
  const jwt = `${signatureInput}.${signatureB64}`;
  
  // Exchange JWT for access token
  const tokenResponse = await fetch(credentials.token_uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  
  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

async function analyzeImageWithVision(imageBase64: string, accessToken: string, projectId: string) {
  const visionUrl = `https://vision.googleapis.com/v1/images:annotate`;
  
  const requestBody = {
    requests: [
      {
        image: {
          content: imageBase64
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 10
          },
          {
            type: 'TEXT_DETECTION',
            maxResults: 5
          }
        ]
      }
    ]
  };

  const response = await fetch(visionUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  return await response.json();
}

async function searchOpenFoodFacts(foodName: string) {
  const searchUrl = `https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${encodeURIComponent(foodName)}&search_simple=1&json=1&page_size=5`;
  
  const response = await fetch(searchUrl);
  const data = await response.json();
  
  if (data.products && data.products.length > 0) {
    const product = data.products[0];
    return {
      name: product.product_name || foodName,
      brand: product.brands || '',
      calories: product.nutriments?.['energy-kcal_100g'] || 0,
      carbs: product.nutriments?.carbohydrates_100g || 0,
      protein: product.nutriments?.proteins_100g || 0,
      fat: product.nutriments?.fat_100g || 0,
      fiber: product.nutriments?.fiber_100g || 0,
      sodium: product.nutriments?.sodium_100g || 0,
      barcode: product.code || '',
      image_url: product.image_url || '',
    };
  }
  
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { image } = await req.json();
    
    if (!image) {
      throw new Error('Image is required');
    }

    // Parse Google Cloud credentials from environment
    const credentialsJson = Deno.env.get('GOOGLE_CLOUD_CREDENTIALS');
    if (!credentialsJson) {
      throw new Error('Google Cloud credentials not configured');
    }
    
    const credentials: GoogleCloudCredentials = JSON.parse(credentialsJson);
    
    // Get access token
    const accessToken = await getAccessToken(credentials);
    
    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // Analyze image with Google Cloud Vision
    const visionResult = await analyzeImageWithVision(base64Image, accessToken, credentials.project_id);
    
    if (visionResult.error) {
      throw new Error(`Vision API error: ${visionResult.error.message}`);
    }

    // Extract food labels
    const labels = visionResult.responses[0]?.labelAnnotations || [];
    const foodLabels = labels
      .filter((label: any) => label.score > 0.7)
      .map((label: any) => label.description.toLowerCase())
      .filter((label: string) => 
        ['food', 'fruit', 'vegetable', 'meat', 'bread', 'drink', 'snack', 'dish'].some(foodWord => 
          label.includes(foodWord) || foodWord.includes(label)
        )
      );

    if (foodLabels.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: 'No food detected in the image. Please try again with a clearer image of food.' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Search for nutrition info using the most relevant food label
    const primaryFood = foodLabels[0];
    const nutritionData = await searchOpenFoodFacts(primaryFood);
    
    if (!nutritionData) {
      return new Response(
        JSON.stringify({ 
          detectedFood: primaryFood,
          error: 'Food detected but nutrition information not found in database.' 
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({
        detectedFood: primaryFood,
        allDetectedLabels: foodLabels,
        nutrition: nutritionData,
        confidence: labels[0]?.score || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error analyzing food:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});