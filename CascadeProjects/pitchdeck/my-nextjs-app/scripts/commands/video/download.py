"""Download generated video."""

import os
import requests
from typing import Dict, Any
from scripts.jogg_api import JoggAPIClient
from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

def download_video(project_id: str) -> str:
    """
    Download a generated video.
    
    Args:
        project_id: ID of the project to download
        
    Returns:
        Path to the downloaded video file
    """
    try:
        # Initialize API client
        api = JoggAPIClient()
        
        # Check status to get URL
        logger.info(f"Getting video URL for project {project_id}...")
        response = api.check_video_status(project_id)
        
        if response.get('code') == 0:
            status_data = response.get('data', {})
            url = status_data.get('url')
            
            if not url:
                raise ValueError("Video URL not found in status response")
            
            # Create videos directory if it doesn't exist
            videos_dir = config.get_path('files', 'videos')
            os.makedirs(videos_dir, exist_ok=True)
            
            # Download video
            logger.info("Downloading video...")
            video_path = os.path.join(videos_dir, f"{project_id}.mp4")
            
            with requests.get(url, stream=True) as r:
                r.raise_for_status()
                with open(video_path, 'wb') as f:
                    for chunk in r.iter_content(chunk_size=8192):
                        f.write(chunk)
                        
            logger.info(f"Video downloaded to {video_path}")
            return video_path
            
        else:
            error_msg = response.get('msg', 'Unknown error')
            logger.error(f"Download failed: {error_msg}")
            raise RuntimeError(error_msg)
            
    except Exception as e:
        logger.error(f"Error downloading video: {str(e)}")
        raise

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        logger.error("Please provide a project ID")
        sys.exit(1)
        
    try:
        download_video(sys.argv[1])
    except Exception as e:
        logger.error(str(e))
        sys.exit(1)
