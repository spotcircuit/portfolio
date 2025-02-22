export interface PropertyAnalysisResult {
  propertyType: 'single_family' | 'townhouse' | 'unknown';
  buildableAreas: {
    frontYard?: boolean;
    backYard?: boolean;
    sideYards?: boolean;
    estimatedSize: string;
  };
  setbacks: {
    front: number;
    back: number;
    sides: number[];
  };
  existingStructures: {
    type: string;
    location: string;
    approximateSize: string;
  }[];
  confidence: number;
}

export async function analyzePropertyImage(imageUrl: string): Promise<PropertyAnalysisResult> {
  try {
    const response = await fetch('/api/vision/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error('Vision analysis failed');
    }

    const result = await response.json();
    return result as PropertyAnalysisResult;
  } catch (error) {
    console.error('Error analyzing property image:', error);
    return {
      propertyType: 'unknown',
      buildableAreas: {
        estimatedSize: 'unknown'
      },
      setbacks: {
        front: 0,
        back: 0,
        sides: [0, 0]
      },
      existingStructures: [],
      confidence: 0
    };
  }
}

export async function validateADUPlacement(
  propertyImageUrl: string, 
  aduBounds: { x: number; y: number; width: number; height: number }
): Promise<{
  isValid: boolean;
  reasons: string[];
  suggestions: string[];
}> {
  try {
    const response = await fetch('/api/vision/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        imageUrl: propertyImageUrl,
        bounds: aduBounds
      }),
    });

    if (!response.ok) {
      throw new Error('Vision validation failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error validating ADU placement:', error);
    return {
      isValid: false,
      reasons: ['Error analyzing placement'],
      suggestions: []
    };
  }
}
