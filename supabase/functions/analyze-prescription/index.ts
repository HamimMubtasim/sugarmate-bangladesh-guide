import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { image } = await req.json()

    // Remove data:image/jpeg;base64, prefix if present
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '')

    // Get Google Cloud credentials from environment
    const googleCredentials = Deno.env.get('GOOGLE_CLOUD_CREDENTIALS')
    if (!googleCredentials) {
      throw new Error('Google Cloud credentials not configured')
    }

    const credentials = JSON.parse(googleCredentials)

    // Call Google Cloud Vision API
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${credentials.private_key_id}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAccessToken(credentials)}`
        },
        body: JSON.stringify({
          requests: [{
            image: {
              content: base64Image
            },
            features: [{
              type: 'TEXT_DETECTION',
              maxResults: 1
            }]
          }]
        })
      }
    )

    const visionData = await visionResponse.json()

    if (!visionResponse.ok) {
      console.error('Vision API error:', visionData)
      throw new Error('Failed to analyze prescription')
    }

    const detectedText = visionData.responses?.[0]?.textAnnotations?.[0]?.description || ''

    // Parse prescription data using regex patterns
    const prescriptionData = parsePrescriptionText(detectedText)

    return new Response(JSON.stringify({ 
      detectedText,
      prescriptionData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in analyze-prescription function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

async function getAccessToken(credentials: any) {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }

  // Create JWT token (simplified - in production use proper JWT library)
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(payload))
  const signatureInput = `${encodedHeader}.${encodedPayload}`
  
  // For now, return a mock token - in production, properly sign with private key
  return 'mock_token'
}

function parsePrescriptionText(text: string) {
  const medicines = []
  const lines = text.split('\n')
  
  // Simple regex patterns for common prescription formats
  const medicinePattern = /([A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+(?:\.\d+)?)\s*(mg|g|ml|tablet|capsule)/i
  const dosagePattern = /(\d+)\s*(?:times?|x)\s*(?:daily|day|per day)/i
  
  for (const line of lines) {
    const medicineMatch = line.match(medicinePattern)
    const dosageMatch = line.match(dosagePattern)
    
    if (medicineMatch) {
      const medicine = {
        name: medicineMatch[1].trim(),
        dosage: `${medicineMatch[2]}${medicineMatch[3]}`,
        type: medicineMatch[3].includes('tablet') ? 'Tablet' : 
              medicineMatch[3].includes('capsule') ? 'Capsule' : 'Other',
        frequency: dosageMatch ? dosageMatch[1] : '1',
        timesPerDay: dosageMatch ? parseInt(dosageMatch[1]) : 1
      }
      medicines.push(medicine)
    }
  }
  
  return { medicines }
}