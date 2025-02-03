"""Capture and save avatar information."""

import json
from typing import Dict, Any, List
from scripts.jogg_api import JoggAPIClient
from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

def capture_all_avatars() -> Dict[str, List[Dict[str, Any]]]:
    """
    Fetch and save information about all avatars.
    
    Returns:
        Dictionary containing lists of public and custom avatars
    """
    api = JoggAPIClient()
    avatars = {
        'public': [],
        'custom': []
    }
    
    try:
        # Fetch public avatars
        logger.info("Fetching public avatars...")
        response = api.list_avatars()
        if response.get('code') == 0:
            avatars['public'] = response['data']
            public_path = config.get_file_path('files', 'jogg', 'public_avatars')
            with open(public_path, 'w', encoding='utf-8') as f:
                json.dump(response['data'], f, indent=2)
            logger.info(f"Saved public avatars to {public_path}")
        else:
            logger.error(f"Error fetching public avatars: {response.get('msg', 'Unknown error')}")
        
        # Fetch custom avatars
        logger.info("Fetching custom avatars...")
        response = api.list_custom_avatars()
        if response.get('code') == 0:
            avatars['custom'] = response['data']
            custom_path = config.get_file_path('files', 'jogg', 'custom_avatars')
            with open(custom_path, 'w', encoding='utf-8') as f:
                json.dump(response['data'], f, indent=2)
            logger.info(f"Saved custom avatars to {custom_path}")
        else:
            logger.error(f"Error fetching custom avatars: {response.get('msg', 'Unknown error')}")
            
        return avatars
        
    except Exception as e:
        logger.error(f"Error capturing avatars: {str(e)}")
        raise

if __name__ == "__main__":
    try:
        capture_all_avatars()
    except Exception as e:
        logger.error(str(e))
        exit(1)
