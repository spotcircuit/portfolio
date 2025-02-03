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

def check_custom_avatars(api_key: str = None):
    """Check custom avatars from the Jogg API."""
    if api_key:
        api_client.api_key = api_key
    
    try:
        # Get custom avatars
        avatar_data = api_client.avatars.list_custom()
        
        # Save response
        responses_dir = config.get_path('responses_dir')
        os.makedirs(responses_dir, exist_ok=True)
        
        with open(os.path.join(responses_dir, 'custom_avatars.json'), 'w', encoding='utf-8') as f:
            json.dump(avatar_data, f, indent=2)
        
        # Print summary
        if avatar_data.get('code') == 0 and 'data' in avatar_data:
            avatars = avatar_data['data'].get('avatars', [])
            logger.info(f"Found {len(avatars)} custom avatars")
            
            for avatar in avatars:
                logger.info(f"Avatar ID: {avatar.get('avatar_id')}")
                logger.info(f"Name: {avatar.get('name')}")
                logger.info(f"Status: {avatar.get('status')}\n")
        
        return avatar_data
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    result = check_custom_avatars()
    if result:
        print(json.dumps(result, indent=2))
        sys.exit(0)
    else:
        sys.exit(1)
