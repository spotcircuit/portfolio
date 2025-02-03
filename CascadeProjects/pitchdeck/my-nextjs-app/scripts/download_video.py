#!/usr/bin/env python3
import json
import os
import sys
from datetime import datetime
from typing import Optional
import requests
from dotenv import load_dotenv

# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(__file__))
sys.path.insert(0, project_root)

# Load environment variables
load_dotenv(os.path.join(project_root, '.env.local'))

from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

def download_video(video_url: str, output_path: Optional[str] = None) -> Optional[str]:
    """Download a video from a URL."""
    if not video_url:
        logger.error("No video URL provided")
        return None
    
    try:
        # Create output directory
        output_dir = output_path or config.get_path('output_dir')
        os.makedirs(output_dir, exist_ok=True)
        
        # Generate output filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_file = os.path.join(output_dir, f'video_{timestamp}.mp4')
        
        # Download video
        logger.info(f"Downloading video from {video_url}")
        response = requests.get(video_url, stream=True)
        response.raise_for_status()
        
        total_size = int(response.headers.get('content-length', 0))
        block_size = 1024  # 1 KB
        
        with open(output_file, 'wb') as f:
            for data in response.iter_content(block_size):
                f.write(data)
        
        logger.info(f"Video downloaded to {output_file}")
        return output_file
        
    except Exception as e:
        logger.error(f"Error downloading video: {str(e)}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python download_video.py <video_url>")
        sys.exit(1)
    
    video_url = sys.argv[1]
    output_file = download_video(video_url)
    
    if output_file:
        print(f"Video downloaded to: {output_file}")
        sys.exit(0)
    else:
        sys.exit(1)
