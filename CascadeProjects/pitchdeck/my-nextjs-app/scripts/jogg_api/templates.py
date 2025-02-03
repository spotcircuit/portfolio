import requests

class TemplateAPI:
    def __init__(self, client):
        self.client = client
    
    def list_templates(self):
        """Get list of available templates"""
        url = f"{self.client.base_url}/templates"
        response = requests.get(url, headers=self.client.get_headers())
        return response.json()
    
    def list_custom_templates(self):
        """Get list of custom templates"""
        url = f"{self.client.base_url}/templates/custom"
        response = requests.get(url, headers=self.client.get_headers())
        return response.json()
