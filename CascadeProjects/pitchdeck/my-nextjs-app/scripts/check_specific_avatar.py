#!/usr/bin/env python3
import json
import os
import sys
from typing import Dict, Any, Optional
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

def load_avatars() -> Dict[str, Any]:
    """Load avatars from config file."""
    try:
        avatars_path = config.get_file_path('avatars')
        with open(avatars_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading avatars config: {str(e)}")
        return {}

def check_specific_avatar(avatar_key: str = None, api_key: str = None) -> Optional[Dict[str, Any]]:
    """Check a specific avatar from the Jogg API."""
    if api_key:
        api_client.api_key = api_key
    
    if not avatar_key:
        logger.error("No avatar key provided")
        return None
    
    # Load avatars config
    avatars_config = load_avatars()
    avatars = avatars_config.get('avatars', {})
    
    # Get avatar ID from config
    avatar = avatars.get(avatar_key)
    if not avatar:
        logger.error(f"Avatar '{avatar_key}' not found in config")
        logger.info("Available avatars:")
        for key, data in avatars.items():
            logger.info(f"- {key}: {data.get('name')} ({data.get('description')})")
        return None
    
    avatar_id = avatar['id']
    
    try:
        # Get avatar from API
        avatar_data = api_client.get('avatars.all', params={'id': avatar_id})
        
        # Save response
        responses_dir = config.get_path('responses_dir')
        os.makedirs(responses_dir, exist_ok=True)
        
        with open(os.path.join(responses_dir, f'avatar_{avatar_key}.json'), 'w', encoding='utf-8') as f:
            json.dump(avatar_data, f, indent=2)
        
        # Print summary
        if avatar_data.get('code') == 0 and 'data' in avatar_data:
            avatar_info = avatar_data['data']
            logger.info(f"Avatar Key: {avatar_key}")
            logger.info(f"Avatar ID: {avatar_info.get('avatar_id')}")
            logger.info(f"Name: {avatar_info.get('name')}")
            logger.info(f"Status: {avatar_info.get('status')}")
        
        return avatar_data
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python check_specific_avatar.py <avatar_key>")
        print("\nExample avatar keys:")
        avatars = load_avatars().get('avatars', {})
        for key, data in avatars.items():
            print(f"- {key}: {data.get('name')} ({data.get('description')})")
        sys.exit(1)
    
    avatar_key = sys.argv[1]
    result = check_specific_avatar(avatar_key)
    if result:
        print(json.dumps(result, indent=2))
        sys.exit(0)
    else:
        sys.exit(1)
