import requests

class VisualStyleAPI:
    def __init__(self, client):
        self.client = client
    
    def list_styles(self, aspect_ratio: int = -1):
        """Get list of available visual styles"""
        url = f"{self.client.base_url}/visual_styles"
        params = {"aspect_ratio": aspect_ratio}
        response = requests.get(url, headers=self.client.get_headers(), params=params)
        return response.json()
