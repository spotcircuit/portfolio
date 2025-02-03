#!/usr/bin/env python3
"""Generate a video using Jogg API."""

import json
import os
import sys
from typing import Dict, Any, Optional

# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
sys.path.insert(0, project_root)

from scripts.utils.config import config
from scripts.utils.logging import setup_logging
from scripts.jogg_api.client import api_client

logger = setup_logging(__name__)

def generate_video() -> Optional[str]:
    """Generate a video using configuration from video_config.json"""
    try:
        # Load video configuration
        config_path = config.get_file_path('files', 'video_config')
        with open(config_path, 'r', encoding='utf-8') as f:
            video_config = json.load(f)
        
        # Generate video
        logger.info("Generating video...")
        response = api_client.generate_video(video_config)
        
        # Save response
        response_path = os.path.join(config.get_path('responses_dir'), 'video_generation.json')
        os.makedirs(os.path.dirname(response_path), exist_ok=True)
        with open(response_path, 'w', encoding='utf-8') as f:
            json.dump(response, f, indent=2)
            
        logger.info(f"Response saved to {response_path}")
        
        if response.get('code') == 0:
            project_id = response.get('data', {}).get('project_id')
            if project_id:
                logger.info(f"Video generation started! Project ID: {project_id}")
                print("\nTo check status, run:")
                print(f"python -m scripts.commands.status {project_id}")
                return project_id
        else:
            error_msg = response.get('msg', 'Unknown error')
            logger.error(f"Video generation failed: {error_msg}")
            return None
            
    except Exception as e:
        logger.error(f"Error generating video: {str(e)}")
        raise

if __name__ == "__main__":
    try:
        project_id = generate_video()
        if not project_id:
            sys.exit(1)
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        sys.exit(1)
