import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID,
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-40-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this satellite image of a property and provide:
              1. Property type (single family or townhouse)
              2. Buildable areas (front yard, back yard, side yards) and their estimated sizes
              3. Setback distances from property lines
              4. Existing structures and their locations
              Provide measurements in feet when possible.
              Format as JSON.`
            },
            {
              type: "image_url",
              image_url: imageUrl,
            }
          ]
        }
      ],
      max_tokens: 1000,
    });

    return NextResponse.json(response.choices[0]?.message?.content || {});
  } catch (error: any) {
    console.error('Vision analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Vision analysis failed' },
      { status: 500 }
    );
  }
}
