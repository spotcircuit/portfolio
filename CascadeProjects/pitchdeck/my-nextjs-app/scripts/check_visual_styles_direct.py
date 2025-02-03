#!/usr/bin/env python3
import json
import os
import sys
from dotenv import load_dotenv

# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(__file__))
sys.path.insert(0, project_root)

# Load environment variables
load_dotenv(os.path.join(project_root, '.env.local'))

from scripts.utils.config import config
from scripts.utils.logging import setup_logging
from scripts.jogg_api.client import api_client

logger = setup_logging(__name__)

def check_visual_styles(api_key: str = None):
    """Check visual styles from the Jogg API."""
    if api_key:
        api_client.api_key = api_key
    
    try:
        # Get visual styles
        visual_data = api_client.visual_styles.list_all()
        
        # Save response
        responses_dir = config.get_path('responses_dir')
        os.makedirs(responses_dir, exist_ok=True)
        
        with open(os.path.join(responses_dir, 'visual_styles.json'), 'w', encoding='utf-8') as f:
            json.dump(visual_data, f, indent=2)
        
        # Print summary
        if visual_data.get('code') == 0 and 'data' in visual_data:
            styles = visual_data['data']
            logger.info(f"Found {len(styles)} visual styles")
            
            for style in styles:
                logger.info(f"Style ID: {style.get('id')}")
                logger.info(f"Name: {style.get('name')}")
                logger.info(f"Description: {style.get('description')}\n")
        
        return visual_data
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    result = check_visual_styles()
    if result:
        print(json.dumps(result, indent=2))
        sys.exit(0)
    else:
        sys.exit(1)
