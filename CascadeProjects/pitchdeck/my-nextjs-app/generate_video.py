#!/usr/bin/env python3
import json
import os
import sys
from dotenv import load_dotenv

# Add project root to Python path
project_root = os.path.dirname(__file__)
sys.path.insert(0, project_root)

# Load environment variables
load_dotenv(os.path.join(project_root, '.env.local'))

from scripts.utils.config import config
from scripts.utils.logging import setup_logging
from scripts.jogg_api.client import api_client

logger = setup_logging(__name__)

def get_video_payload(product_id: str, lead_data: dict) -> dict:
    """Build the video generation payload."""
    try:
        # Load video config using path from base_config.json
        video_config_dir = config.get_path('video_config')
        video_config_path = os.path.join(video_config_dir, 'video_config.json')
        video_config_path = video_config_path.replace('/', '\\')  # Windows paths
        
        with open(video_config_path, 'r', encoding='utf-8') as f:
            video_config = json.load(f)
        
        # Update product_id
        video_config['product_id'] = product_id
        
        # Update script with lead name
        if 'override_script' in video_config:
            first_name = lead_data.get('lead', {}).get('first_name', '')
            script = video_config['override_script']
            script = script.replace('John', first_name)  # Replace placeholder name
            video_config['override_script'] = script
        
        # Log the payload for review
        logger.info("Video Generation Payload:")
        logger.info(json.dumps(video_config, indent=2))
        
        return video_config
        
    except Exception as e:
        logger.error(f"Error loading video config: {str(e)}")
        return None

def generate_video(product_id: str = None, api_key: str = None):
    """Generate a video using the Jogg API."""
    if api_key:
        api_client.api_key = api_key
    
    # Load current lead
    lead_file = config.get_file_path('lead')
    with open(lead_file, 'r', encoding='utf-8') as f:
        lead_data = json.load(f)
    
    # Use provided product_id or from lead data
    product_id = product_id or lead_data.get('lead', {}).get('product_id')
    if not product_id:
        logger.error("No product ID provided or found in lead data")
        return None
    
    # Get payload from config
    payload = get_video_payload(product_id, lead_data)
    if not payload:
        return None
    
    try:
        # Generate video
        response_data = api_client.post('generate_video', json_data=payload)
        
        if response_data.get('code') == 0:
            # Save response
            responses_dir = config.get_path('responses_dir')
            os.makedirs(responses_dir, exist_ok=True)
            
            response_file = os.path.join(responses_dir, 'video_response.json')
            with open(response_file, 'w', encoding='utf-8') as f:
                json.dump(response_data, f, indent=2)
            
            logger.info(f"Response saved to {response_file}")
        
        return response_data
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    # Just show the payload without generating
    lead_file = config.get_file_path('lead')
    with open(lead_file, 'r', encoding='utf-8') as f:
        lead_data = json.load(f)
    
    product_id = lead_data.get('lead', {}).get('product_id')
    if product_id:
        payload = get_video_payload(product_id, lead_data)
        print(json.dumps(payload, indent=2))
    else:
        print("No product ID found in lead data")
