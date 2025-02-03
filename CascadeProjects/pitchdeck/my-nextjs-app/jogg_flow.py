import os
import json
import sys
from dotenv import load_dotenv

# Add project root to Python path
project_root = os.path.dirname(__file__)
sys.path.insert(0, project_root)

# Load environment variables
load_dotenv(os.path.join(project_root, '.env.local'))

from scripts.utils.config import config
from scripts.utils.logging import setup_logging
from get_product_id import submit_url
from update_product import update_product
from generate_video import generate_video

logger = setup_logging(__name__)

def process_url(url: str, api_key: str = None):
    """Process a URL through the Jogg API workflow"""
    if api_key is None:
        api_key = os.getenv('JOGG_API_KEY')
    
    logger.info("=== Starting URL Processing ===")
    
    # Step 1: Submit URL to get product ID
    logger.info("\nStep 1: Submitting URL to get product ID")
    product_response = submit_url(url, api_key)
    if not product_response or product_response.get('code') != 0:
        logger.error("Failed to get product ID")
        return None
    
    product_id = product_response.get('data', {}).get('product_id')
    if not product_id:
        logger.error("No product ID in response")
        return None
    
    # Save product ID to config
    config_file = config.get_file_path('files', 'lead_config')
    with open(config_file, 'r', encoding='utf-8') as f:
        lead_config = json.load(f)
    
    lead_config.setdefault('video', {})['product_id'] = product_id
    with open(config_file, 'w', encoding='utf-8') as f:
        json.dump(lead_config, f, indent=2)
    
    logger.info(f"Product ID: {product_id}")
    
    # Step 2: Update product configuration
    logger.info("\nStep 2: Updating product configuration")
    update_response = update_product(product_id, api_key)
    if not update_response or update_response.get('code') != 0:
        logger.error("Failed to update product configuration")
        return None
    
    logger.info("Product configuration updated successfully")
    
    # Step 3: Generate video
    logger.info("\nStep 3: Generating video")
    video_response = generate_video(product_id, api_key)
    if not video_response or video_response.get('code') != 0:
        logger.error("Failed to generate video")
        return None
    
    logger.info("Video generation started successfully")
    return video_response

if __name__ == "__main__":
    # Load URL from config if not provided
    config_file = config.get_file_path('files', 'lead_config')
    with open(config_file, 'r', encoding='utf-8') as f:
        lead_config = json.load(f)
    
    url = lead_config.get('url')
    if not url:
        logger.error("No URL found in lead_config.json")
        sys.exit(1)
    
    result = process_url(url)
    if result and result.get('code') == 0:
        print(json.dumps(result, indent=2))
        sys.exit(0)
    else:
        sys.exit(1)
