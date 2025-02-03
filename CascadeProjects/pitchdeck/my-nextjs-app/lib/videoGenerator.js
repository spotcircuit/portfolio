const fetch = require('node-fetch');
require('dotenv').config();

class VideoGenerator {
  constructor(apiKey, avatarId) {
    this.apiKey = apiKey;
    this.avatarId = avatarId;
    this.baseUrl = 'https://api.jogg.ai/v1';
  }

  async fetchProductInfo(productUrl) {
    try {
      const response = await fetch(productUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product info:', error);
      throw error;
    }
  }

  generateScript(productInfo, targetAudience) {
    // Customize this function to generate your preferred script format
    const script = {
      intro: `Hi there! I'm excited to tell you about an amazing product that's perfect for ${targetAudience}.`,
      features: productInfo.features.map(feature => 
        `What's really cool is that ${feature.description}`
      ).join(' '),
      benefits: `This is especially great for ${targetAudience} because...`,
      callToAction: `Don't wait - check it out now and see the difference it can make for you.`
    };

    return `${script.intro} ${script.features} ${script.benefits} ${script.callToAction}`;
  }

  async createVideo(productUrl, targetAudience) {
    try {
      console.log('Starting video generation process...');
      
      // Step 1: Fetch product information
      console.log('Fetching product information...');
      const productInfo = await this.fetchProductInfo(productUrl);
      
      // Step 2: Generate custom script
      console.log('Generating custom script...');
      const script = this.generateScript(productInfo, targetAudience);
      
      // Step 3: Create video request
      console.log('Creating video request...');
      const videoRequest = {
        avatar_id: this.avatarId,
        script: script,
        max_duration: 30,
        style: "professional",
        media: productInfo.images, // Array of image URLs
        background: "gradient", // or any specific background
        emotions: ["friendly", "enthusiastic"],
        gestures: ["natural", "engaging"],
        camera_angles: ["medium", "close-up"]
      };

      // Step 4: Send request to Jogg API
      const response = await fetch(`${this.baseUrl}/avatar/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(videoRequest)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API request failed: ${errorData}`);
      }

      const { request_id } = await response.json();
      console.log('Video generation started. Request ID:', request_id);

      // Step 5: Poll for status
      let status = 'pending';
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes with 5-second intervals
      let videoUrl = null;

      while (status === 'pending' || status === 'processing') {
        if (attempts >= maxAttempts) {
          throw new Error('Video generation timed out');
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

        const statusCheck = await fetch(`${this.baseUrl}/requests/${request_id}`, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        });

        if (!statusCheck.ok) {
          const errorData = await statusCheck.text();
          throw new Error(`Status check failed: ${errorData}`);
        }

        const statusData = await statusCheck.json();
        status = statusData.status;
        console.log(`Status check ${attempts + 1}/${maxAttempts}: ${status}`);

        if (status === 'completed') {
          videoUrl = statusData.video_url;
          break;
        } else if (status === 'failed') {
          throw new Error('Video generation failed');
        }

        attempts++;
      }

      return {
        status: 'completed',
        videoUrl,
        requestId: request_id
      };

    } catch (error) {
      console.error('Error in video generation:', error);
      return {
        status: 'failed',
        error: error.message
      };
    }
  }

  // Helper method to validate webhook signature
  validateWebhook(signature, payload, secret) {
    // Implement webhook signature validation
    // This is important for production use
    return true; // Implement actual validation
  }
}

module.exports = VideoGenerator;
