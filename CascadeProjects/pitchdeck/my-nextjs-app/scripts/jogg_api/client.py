"""Jogg API client for video generation."""

import json
import os
import sys
from typing import Dict, Any, Optional
import requests
from datetime import datetime

# Add the project root to the Python path using Windows-style paths
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, project_root)

from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

class JoggAPI:
    """Client for interacting with the Jogg API."""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the Jogg API client.
        
        Args:
            api_key: Optional API key. If not provided, will look for JOGG_API_KEY in environment.
        """
        self.api_key = api_key
        jogg_config = config.get_api_config('jogg')
        self.base_url = jogg_config['base_url']
        self.endpoints = jogg_config.get('endpoints', {})
        
        self.session = requests.Session()
        self.session.headers.update(jogg_config['headers'])
        
        # Initialize resource clients
        self.avatars = AvatarClient(self)
        self.voices = VoiceClient(self)
        self.visual_styles = VisualStyleClient(self)
        self.music = MusicClient(self)
        self.templates = TemplateClient(self)
        self.webhooks = WebhookClient(self)
    
    def _ensure_api_key(self):
        """Ensure API key is set before making requests."""
        if not self.api_key:
            self.api_key = os.getenv('JOGG_API_KEY')
            if not self.api_key:
                raise ValueError("API key must be provided or set in JOGG_API_KEY environment variable")
            self.session.headers.update({'x-api-key': self.api_key})
    
    def _get_endpoint(self, endpoint_key: str) -> str:
        """Get endpoint URL from config."""
        endpoint = self.endpoints
        for key in endpoint_key.split('.'):
            endpoint = endpoint.get(key, {})
        if isinstance(endpoint, str):
            return endpoint
        raise ValueError(f"Endpoint not found: {endpoint_key}")
    
    def _make_request(
        self,
        method: str,
        endpoint_key: str,
        params: Optional[Dict] = None,
        json_data: Optional[Dict] = None,
        **kwargs
    ) -> Dict[str, Any]:
        """
        Make a request to the Jogg API.
        
        Args:
            method: HTTP method (GET, POST, etc.)
            endpoint_key: Key path to endpoint in config (e.g. 'avatars.custom')
            params: Query parameters
            json_data: JSON body data
            **kwargs: Additional arguments to pass to requests
            
        Returns:
            API response data
            
        Raises:
            requests.exceptions.RequestException: If the request fails
        """
        self._ensure_api_key()
        
        endpoint = self._get_endpoint(endpoint_key)
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        try:
            response = self.session.request(method, url, params=params, json=json_data, **kwargs)
            response.raise_for_status()
            
            # Save response for debugging
            self._save_response(response.json(), endpoint)
            
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"API request failed: {str(e)}")
            if hasattr(e.response, 'json'):
                try:
                    error_data = e.response.json()
                    logger.error(f"API error response: {json.dumps(error_data, indent=2)}")
                except json.JSONDecodeError:
                    logger.error(f"API error response (raw): {e.response.text}")
            raise
    
    def _save_response(self, response_data: Dict[str, Any], endpoint: str) -> None:
        """
        Save API response for debugging.
        
        Args:
            response_data: Response data to save
            endpoint: API endpoint for filename
        """
        try:
            # Create responses directory if it doesn't exist
            responses_dir = config.get_path('responses_dir')
            os.makedirs(responses_dir, exist_ok=True)
            
            # Create filename from endpoint and timestamp
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            endpoint_name = endpoint.replace('/', '_').strip('_')
            filename = f"{endpoint_name}_{timestamp}.json"
            
            # Save response
            response_path = os.path.join(responses_dir, filename)
            with open(response_path, 'w', encoding='utf-8') as f:
                json.dump(response_data, f, indent=2)
                
            logger.debug(f"Saved API response to {response_path}")
            
        except Exception as e:
            logger.warning(f"Failed to save API response: {str(e)}")
    
    def get(self, endpoint_key: str, params: Optional[Dict] = None, **kwargs) -> Dict[str, Any]:
        """Make GET request to API endpoint."""
        return self._make_request('GET', endpoint_key, params=params, **kwargs)
    
    def post(self, endpoint_key: str, json_data: Optional[Dict] = None, **kwargs) -> Dict[str, Any]:
        """Make POST request to API endpoint."""
        return self._make_request('POST', endpoint_key, json_data=json_data, **kwargs)
    
    def put(self, endpoint_key: str, json_data: Optional[Dict] = None, **kwargs) -> Dict[str, Any]:
        """Make PUT request to API endpoint."""
        return self._make_request('PUT', endpoint_key, json_data=json_data, **kwargs)
    
    def delete(self, endpoint_key: str, **kwargs) -> Dict[str, Any]:
        """Make DELETE request to API endpoint."""
        return self._make_request('DELETE', endpoint_key, **kwargs)

class ResourceClient:
    """Base class for API resource clients."""
    
    def __init__(self, client: JoggAPI):
        self.client = client

class AvatarClient(ResourceClient):
    """Client for avatar-related endpoints."""
    
    def list_custom(self) -> Dict[str, Any]:
        """List custom avatars."""
        return self.client.get('avatars.custom')
    
    def list_all(self) -> Dict[str, Any]:
        """List all avatars."""
        return self.client.get('avatars.all')
    
    def list_my(self) -> Dict[str, Any]:
        """List my avatars."""
        return self.client.get('avatars.my')
    
    def list_instant(self) -> Dict[str, Any]:
        """List instant avatars."""
        return self.client.get('avatars.instant')

class VoiceClient(ResourceClient):
    """Client for voice-related endpoints."""
    
    def list_all(self) -> Dict[str, Any]:
        """List all voices."""
        return self.client.get('voices.all')
    
    def list_custom(self) -> Dict[str, Any]:
        """List custom voices."""
        return self.client.get('voices.custom')

class VisualStyleClient(ResourceClient):
    """Client for visual style-related endpoints."""
    
    def list_all(self) -> Dict[str, Any]:
        """List all visual styles."""
        return self.client.get('visual_styles')

class MusicClient(ResourceClient):
    """Client for music-related endpoints."""
    
    def list_all(self) -> Dict[str, Any]:
        """List all music."""
        return self.client.get('music')

class TemplateClient(ResourceClient):
    """Client for template-related endpoints."""
    
    def list_all(self) -> Dict[str, Any]:
        """List all templates."""
        return self.client.get('templates.all')
    
    def list_custom(self) -> Dict[str, Any]:
        """List custom templates."""
        return self.client.get('templates.custom')

class WebhookClient(ResourceClient):
    """Client for webhook-related endpoints."""
    
    def list_all(self) -> Dict[str, Any]:
        """List all webhooks."""
        return self.client.get('webhooks.all')
    
    def list_events(self) -> Dict[str, Any]:
        """List webhook events."""
        return self.client.get('webhooks.events')

# Create global API client instance
api_client = JoggAPI()
