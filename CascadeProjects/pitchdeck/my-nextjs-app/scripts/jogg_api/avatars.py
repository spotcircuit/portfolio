"""Avatar management for Jogg API."""

import os
import sys
from typing import Dict, Any, List, Optional
import json

# Add the project root to the Python path using Windows-style paths
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, project_root)

from scripts.utils.config import config
from scripts.utils.logging import setup_logging
from .client import api_client

logger = setup_logging(__name__)

class AvatarAPI:
    def __init__(self, client):
        self.client = client
        # Default endpoints for custom avatars
        self.custom_avatar_endpoints = [
            '/avatars/custom',
            '/avatars/my',
            '/avatars?type=custom',
            '/avatars?custom=true'
        ]
    
    def list_avatars(self) -> List[Dict[str, Any]]:
        """
        Get list of available avatars.
        
        Returns:
            List of avatar objects
        """
        try:
            response = api_client.get('avatars')
            avatars = response.get('avatars', [])
            
            # Save avatar list for reference
            avatars_dir = os.path.join(config.get_path('config', 'api'), 'jogg_options')
            os.makedirs(avatars_dir, exist_ok=True)
            
            avatars_file = os.path.join(avatars_dir, 'avatars.json')
            with open(avatars_file, 'w', encoding='utf-8') as f:
                json.dump({'avatars': avatars}, f, indent=2)
                
            logger.info(f"Found {len(avatars)} avatars")
            return avatars
            
        except Exception as e:
            logger.error(f"Failed to list avatars: {str(e)}")
            raise
    
    def get_avatar(self, avatar_id: str) -> Optional[Dict[str, Any]]:
        """
        Get details for a specific avatar.
        
        Args:
            avatar_id: ID of the avatar to get
            
        Returns:
            Avatar object if found, None otherwise
        """
        try:
            response = api_client.get(f'avatars/{avatar_id}')
            avatar = response.get('avatar')
            
            if avatar:
                logger.info(f"Found avatar: {avatar.get('name', avatar_id)}")
            else:
                logger.warning(f"Avatar not found: {avatar_id}")
                
            return avatar
            
        except Exception as e:
            logger.error(f"Failed to get avatar {avatar_id}: {str(e)}")
            raise
    
    def get_custom_avatars(self) -> List[Dict[str, Any]]:
        """
        Get list of custom avatars.
        
        Returns:
            List of custom avatar objects
        """
        try:
            response = api_client.get('avatars/custom')
            avatars = response.get('avatars', [])
            
            # Save custom avatars list
            custom_file = os.path.join(config.get_path('config'), 'custom_avatars.json')
            with open(custom_file, 'w', encoding='utf-8') as f:
                json.dump({'avatars': avatars}, f, indent=2)
                
            logger.info(f"Found {len(avatars)} custom avatars")
            return avatars
            
        except Exception as e:
            logger.error(f"Failed to get custom avatars: {str(e)}")
            raise
    
    def capture_avatar(self, avatar_id: str) -> Dict[str, Any]:
        """
        Capture a custom avatar.
        
        Args:
            avatar_id: ID of the avatar to capture
            
        Returns:
            Captured avatar object
        """
        try:
            response = api_client.post(f'avatars/{avatar_id}/capture')
            avatar = response.get('avatar')
            
            if avatar:
                logger.info(f"Captured avatar: {avatar.get('name', avatar_id)}")
                
                # Save captured avatar
                captures_dir = os.path.join(config.get_path('data'), 'avatars', 'captures')
                os.makedirs(captures_dir, exist_ok=True)
                
                capture_file = os.path.join(captures_dir, f'{avatar_id}.json')
                with open(capture_file, 'w', encoding='utf-8') as f:
                    json.dump(avatar, f, indent=2)
            
            return avatar
            
        except Exception as e:
            logger.error(f"Failed to capture avatar {avatar_id}: {str(e)}")
            raise
    
    def list_custom_avatars(self, endpoints=None):
        """Get list of custom avatars
        Args:
            endpoints (list, optional): List of endpoints to try for custom avatars. 
                                     If None, uses default endpoints.
        """
        # Use provided endpoints or defaults
        endpoints = endpoints or self.custom_avatar_endpoints
        
        results = []
        for endpoint in endpoints:
            url = f"{self.client.base_url}{endpoint}"
            logger.info(f"Trying to fetch custom avatars from {url}")
            try:
                response = api_client.get(url)
                logger.info(f"Response status: {response.status_code}")
                logger.info(f"Response headers: {response.headers}")
                logger.info(f"Response content: {response.text[:200]}...")  # Log first 200 chars
                
                if response.status_code == 200:
                    data = response.json()
                    if data and 'data' in data and 'avatars' in data['data']:
                        results.extend(data['data']['avatars'])
                    elif data and 'avatars' in data:
                        results.extend(data['avatars'])
            except Exception as e:
                logger.error(f"Error fetching from {url}: {str(e)}")
        
        # Remove duplicates based on avatar_id
        seen_ids = set()
        unique_results = []
        for avatar in results:
            avatar_id = avatar.get('avatar_id')
            if avatar_id and avatar_id not in seen_ids:
                seen_ids.add(avatar_id)
                unique_results.append(avatar)
        
        return unique_results
