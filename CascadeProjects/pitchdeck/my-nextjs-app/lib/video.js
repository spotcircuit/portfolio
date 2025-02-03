// Function to create a video request using Jogg API
async function createVideoRequest(lead) {
  const response = await fetch('https://api.jogg.ai/v1/requests', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.JOGG_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: generatePrompt(lead),
      max_duration: 60,
      style: "professional",
      // Add more Jogg-specific parameters as needed
    }),
  });

  const data = await response.json();
  return data;
}

// Generate a personalized prompt based on lead data
function generatePrompt(lead) {
  const name = `${lead.firstName} ${lead.lastName}`.trim();
  const company = lead.companyName || lead.companyDomain || 'your company';
  const location = lead.city ? `${lead.city}-based` : '';
  const role = lead.role || 'leader';

  return `Create a personalized video for ${name}, a ${location} ${role} at ${company}. 
          The video should highlight how our platform can help streamline their operations 
          and boost their business growth. Include specific references to their company 
          and role where appropriate.`;
}

// Function to check video generation status
async function checkVideoStatus(requestId) {
  const response = await fetch(`https://api.jogg.ai/v1/requests/${requestId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.JOGG_API_KEY}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function generateVideo(lead) {
  try {
    console.log(`Generating video for ${lead.firstName} ${lead.lastName} at ${lead.companyName || lead.companyDomain}`);
    
    // Create video request
    const request = await createVideoRequest(lead);
    
    // In a real n8n workflow, this polling would be handled by n8n
    // For now, we'll implement a simple polling mechanism
    let status = 'pending';
    let videoUrl = null;
    let attempts = 0;
    const maxAttempts = 10;

    while (status === 'pending' && attempts < maxAttempts) {
      const statusCheck = await checkVideoStatus(request.id);
      status = statusCheck.status;
      
      if (status === 'completed') {
        videoUrl = statusCheck.video_url;
        break;
      }
      
      attempts++;
      // Wait 5 seconds between checks
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (!videoUrl) {
      throw new Error('Video generation timed out or failed');
    }

    // Save video locally (this would be handled differently in production)
    const videoFileName = `${lead.firstName}_${lead.lastName}_${Date.now()}.mp4`.replace(/[^a-z0-9_]/gi, '_').toLowerCase();
    const videoPath = `video-output/${videoFileName}`;
    
    // Log the success
    console.log(`Video generated successfully: ${videoUrl}`);
    console.log(`Saved to: ${videoPath}`);

    return {
      url: videoUrl,
      localPath: videoPath,
      lead: lead
    };
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
}
