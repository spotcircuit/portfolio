"""Jogg API client for video generation."""

import os
import json
import requests
from typing import Dict, Any, Optional
from dotenv import load_dotenv
from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

class JoggAPIClient:
    """Client for interacting with the Jogg API."""
    
    def __init__(self):
        """Initialize the API client."""
        # Load environment variables
        load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env.local'))
        
        self.api_key = os.getenv('JOGG_API_KEY')
        if not self.api_key:
            raise ValueError("JOGG_API_KEY not found in environment variables")
            
        self.base_url = config.get('api', 'jogg', 'base_url')
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
    
    def _make_request(
        self,
        method: str,
        endpoint: str,
        params: Optional[Dict] = None,
        data: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """
        Make a request to the Jogg API.
        
        Args:
            method: HTTP method (GET, POST, etc.)
            endpoint: API endpoint
            params: Query parameters
            data: Request body data
            
        Returns:
            API response
        """
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        try:
            response = requests.request(
                method=method,
                url=url,
                headers=self.headers,
                params=params,
                json=data
            )
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"API request failed: {str(e)}")
            if hasattr(e.response, 'text'):
                logger.error(f"Response: {e.response.text}")
            raise
    
    def list_avatars(self) -> Dict[str, Any]:
        """List all public avatars."""
        return self._make_request('GET', '/avatars')
    
    def list_custom_avatars(self) -> Dict[str, Any]:
        """List all custom avatars."""
        return self._make_request('GET', '/custom-avatars')
    
    def list_voices(self) -> Dict[str, Any]:
        """List all available voices."""
        return self._make_request('GET', '/voices')
    
    def list_custom_voices(self) -> Dict[str, Any]:
        """List all custom voices."""
        return self._make_request('GET', '/custom-voices')
    
    def list_visual_styles(self, aspect_ratio: int = None) -> Dict[str, Any]:
        """
        List visual styles.
        
        Args:
            aspect_ratio: 0 for portrait, 1 for landscape
        """
        params = {}
        if aspect_ratio is not None:
            params['aspect_ratio'] = aspect_ratio
        return self._make_request('GET', '/visual-styles', params=params)
    
    def list_music(self) -> Dict[str, Any]:
        """List all available music."""
        return self._make_request('GET', '/music')
    
    def list_templates(self) -> Dict[str, Any]:
        """List all public templates."""
        return self._make_request('GET', '/templates')
    
    def list_custom_templates(self) -> Dict[str, Any]:
        """List all custom templates."""
        return self._make_request('GET', '/custom-templates')
    
    def list_webhook_events(self) -> Dict[str, Any]:
        """List all available webhook events."""
        return self._make_request('GET', '/webhook-events')
    
    def generate_video(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate a video using the provided configuration.
        
        Args:
            config: Video configuration
            
        Returns:
            API response containing project_id
        """
        return self._make_request('POST', '/create_video_from_url', data=config)
    
    def check_video_status(self, project_id: str) -> Dict[str, Any]:
        """
        Check the status of a video generation project.
        
        Args:
            project_id: ID of the project to check
            
        Returns:
            API response containing status
        """
        return self._make_request('GET', f'/video/status/{project_id}')

from .avatars import AvatarAPI
from .voices import VoiceAPI
from .visual_styles import VisualStyleAPI
from .music import MusicAPI
from .templates import TemplateAPI
from .webhooks import WebhookAPI

__all__ = [
    'JoggAPIClient',
    'AvatarAPI',
    'VoiceAPI',
    'VisualStyleAPI',
    'MusicAPI',
    'TemplateAPI',
    'WebhookAPI'
]
