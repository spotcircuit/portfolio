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

def get_video_params(api_key: str = None):
    """Get video parameters from the Jogg API."""
    if api_key:
        api_client.api_key = api_key
    
    try:
        # Get avatars
        avatar_data = api_client.avatars.list_all()
        logger.info(f"Got {len(avatar_data.get('data', []))} avatars")
        
        # Get voices
        voice_data = api_client.voices.list_all()
        logger.info(f"Got {len(voice_data.get('data', []))} voices")
        
        # Get visual styles
        visual_data = api_client.visual_styles.list_all()
        logger.info(f"Got {len(visual_data.get('data', []))} visual styles")
        
        # Get music
        music_data = api_client.music.list_all()
        logger.info(f"Got {len(music_data.get('data', []))} music tracks")
        
        # Save all responses
        responses_dir = config.get_path('responses_dir')
        os.makedirs(responses_dir, exist_ok=True)
        
        with open(os.path.join(responses_dir, 'avatars.json'), 'w', encoding='utf-8') as f:
            json.dump(avatar_data, f, indent=2)
        
        with open(os.path.join(responses_dir, 'voices.json'), 'w', encoding='utf-8') as f:
            json.dump(voice_data, f, indent=2)
        
        with open(os.path.join(responses_dir, 'visual_styles.json'), 'w', encoding='utf-8') as f:
            json.dump(visual_data, f, indent=2)
        
        with open(os.path.join(responses_dir, 'music.json'), 'w', encoding='utf-8') as f:
            json.dump(music_data, f, indent=2)
        
        return {
            'avatars': avatar_data,
            'voices': voice_data,
            'visual_styles': visual_data,
            'music': music_data
        }
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    result = get_video_params()
    if result:
        print(json.dumps(result, indent=2))
        sys.exit(0)
    else:
        sys.exit(1)
