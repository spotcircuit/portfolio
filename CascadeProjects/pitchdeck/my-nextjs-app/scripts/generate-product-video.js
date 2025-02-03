require('dotenv').config();
const VideoGenerator = require('../lib/videoGenerator');

async function main() {
  // Your custom avatar ID from Jogg
  const AVATAR_ID = process.env.JOGG_AVATAR_ID;
  const API_KEY = process.env.JOGG_API_KEY;
  
  // Create video generator instance
  const generator = new VideoGenerator(API_KEY, AVATAR_ID);
  
  // Example product URL and target audience
  const productUrl = process.argv[2];
  const targetAudience = process.argv[3] || "business professionals";
  
  if (!productUrl) {
    console.error('Please provide a product URL as an argument');
    process.exit(1);
  }

  console.log(`Generating video for product: ${productUrl}`);
  console.log(`Target audience: ${targetAudience}`);

  try {
    const result = await generator.createVideo(productUrl, targetAudience);
    
    if (result.status === 'completed') {
      console.log('\nVideo generated successfully! 🎉');
      console.log('Video URL:', result.videoUrl);
      console.log('Request ID:', result.requestId);
    } else {
      console.error('\nVideo generation failed:', result.error);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
