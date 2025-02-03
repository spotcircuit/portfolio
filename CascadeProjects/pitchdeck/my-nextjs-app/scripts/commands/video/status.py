"""Check video generation status."""

import json
from typing import Dict, Any
from scripts.jogg_api import JoggAPIClient
from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

def check_status(project_id: str) -> Dict[str, Any]:
    """
    Check the status of a video generation project.
    
    Args:
        project_id: ID of the project to check
        
    Returns:
        Status information from the API
    """
    try:
        # Initialize API client
        api = JoggAPIClient()
        
        # Check status
        logger.info(f"Checking status for project {project_id}...")
        response = api.check_video_status(project_id)
        
        # Save response
        status_path = config.get_file_path('files', 'status')
        with open(status_path, 'w', encoding='utf-8') as f:
            json.dump(response, f, indent=2)
        logger.info(f"Saved status to {status_path}")
        
        if response.get('code') == 0:
            status_data = response.get('data', {})
            status = status_data.get('status')
            url = status_data.get('url')
            
            logger.info(f"Status: {status}")
            if url:
                logger.info(f"Video URL: {url}")
                logger.info("\nTo download the video, run:")
                logger.info(f"python -m scripts.commands.video.download {project_id}")
            
            return status_data
        else:
            error_msg = response.get('msg', 'Unknown error')
            logger.error(f"Status check failed: {error_msg}")
            raise RuntimeError(error_msg)
            
    except Exception as e:
        logger.error(f"Error checking status: {str(e)}")
        raise

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        logger.error("Please provide a project ID")
        sys.exit(1)
        
    try:
        check_status(sys.argv[1])
    except Exception as e:
        logger.error(str(e))
        sys.exit(1)
