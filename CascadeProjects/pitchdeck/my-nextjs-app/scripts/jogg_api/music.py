import requests

class MusicAPI:
    def __init__(self, client):
        self.client = client
    
    def list_music(self):
        """Get list of available music"""
        url = f"{self.client.base_url}/musics"
        response = requests.get(url, headers=self.client.get_headers())
        return response.json()
