import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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
    const { prompt, userId } = await req.json()

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get user's health data for context
    const [profileData, glucoseData, foodData, medicineData] = await Promise.all([
      supabase.from('profiles').select('*').eq('user_id', userId).single(),
      supabase.from('glucose_logs').select('*').eq('user_id', userId).order('logged_at', { ascending: false }).limit(10),
      supabase.from('food_logs').select('*').eq('user_id', userId).order('logged_at', { ascending: false }).limit(10),
      supabase.from('medicines').select('*').eq('user_id', userId)
    ])

    // Build context for AI
    let context = "You are an AI health coach specializing in diabetes management. Here's the user's health data:\n\n"
    
    if (profileData.data) {
      const profile = profileData.data
      context += `Profile: ${profile.name}, Age: ${profile.age}, Gender: ${profile.gender}, Diabetes Type: ${profile.diabetes_type}, Diagnosed: ${profile.diagnosis_year}\n\n`
    }

    if (glucoseData.data && glucoseData.data.length > 0) {
      context += "Recent Glucose Readings:\n"
      glucoseData.data.forEach(reading => {
        context += `${reading.logged_at}: ${reading.glucose_level} ${reading.unit} (${reading.meal_context || 'No context'})\n`
      })
      context += "\n"
    }

    if (foodData.data && foodData.data.length > 0) {
      context += "Recent Food Intake:\n"
      foodData.data.forEach(food => {
        const calories = food.actual_calories || (food.calories_per_100g * food.portion_percentage / 100)
        const carbs = food.actual_carbs || (food.carbs_per_100g * food.portion_percentage / 100)
        context += `${food.logged_at}: ${food.food_name} - ${calories}cal, ${carbs}g carbs\n`
      })
      context += "\n"
    }

    if (medicineData.data && medicineData.data.length > 0) {
      context += "Current Medications:\n"
      medicineData.data.forEach(med => {
        context += `${med.name} - ${med.dosage} (${med.type})\n`
      })
      context += "\n"
    }

    context += `User Question: ${prompt}\n\nProvide helpful, personalized advice based on their data. Keep responses concise and actionable.`

    // Call Gemini API
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: context
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      console.error('Gemini API error:', data)
      throw new Error('Failed to get AI response')
    }

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process your request at this time.'

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in ai-coach function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})