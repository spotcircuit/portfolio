import requests

class WebhookAPI:
    def __init__(self, client):
        self.client = client
    
    def list_endpoints(self):
        """Get list of webhook endpoints"""
        url = f"{self.client.base_url}/endpoints"
        response = requests.get(url, headers=self.client.get_headers())
        return response.json()
    
    def create_endpoint(self, webhook_url: str, events: list, status: str = "enabled"):
        """Create a new webhook endpoint"""
        url = f"{self.client.base_url}/endpoint"
        payload = {
            "url": webhook_url,
            "events": events,
            "status": status
        }
        response = requests.post(url, headers=self.client.get_headers(), json=payload)
        return response.json()
    
    def update_endpoint(self, endpoint_id: str, webhook_url: str, events: list, status: str = "enabled"):
        """Update an existing webhook endpoint"""
        url = f"{self.client.base_url}/endpoint/{endpoint_id}"
        payload = {
            "url": webhook_url,
            "events": events,
            "status": status
        }
        response = requests.put(url, headers=self.client.get_headers(), json=payload)
        return response.json()
    
    def delete_endpoint(self, endpoint_id: str):
        """Delete a webhook endpoint"""
        url = f"{self.client.base_url}/endpoint/{endpoint_id}"
        response = requests.delete(url, headers=self.client.get_headers())
        return response.json()
    
    def list_available_events(self):
        """Get list of available webhook events"""
        url = f"{self.client.base_url}/events"
        response = requests.get(url, headers=self.client.get_headers())
        return response.json()
