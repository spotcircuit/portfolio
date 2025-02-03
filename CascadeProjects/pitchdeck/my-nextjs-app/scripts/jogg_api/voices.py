import requests

class VoiceAPI:
    def __init__(self, client):
        self.client = client
    
    def list_voices(self):
        """Get list of available voices"""
        url = f"{self.client.base_url}/voices"
        response = requests.get(url, headers=self.client.get_headers())
        return response.json()
    
    def list_custom_voices(self):
        """Get list of custom voices"""
        url = f"{self.client.base_url}/voices/custom"
        response = requests.get(url, headers=self.client.get_headers())
        return response.json()
