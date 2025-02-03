import requests
import json
import os
from dotenv import load_dotenv
from typing import Dict, Optional

class JoggAPI:
    def __init__(self, api_key: str = None):
        if api_key is None:
            # Load environment variables
            load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
            api_key = os.getenv('JOGG_API_KEY')
            if not api_key:
                raise ValueError("JOGG_API_KEY not found in environment variables")
        
        self.api_key = api_key
        self.base_url = "https://api.jogg.ai/v1"
        self.headers = {
            "x-api-key": self.api_key,
            "Content-Type": "application/json"
        }
    
    def submit_product_url(self, url: str) -> Dict:
        """
        Submit a product URL to the Jogg API
        
        Args:
            url (str): The URL of the product website
            
        Returns:
            Dict: The API response
        """
        endpoint = f"{self.base_url}/product"
        payload = {"url": url}
        
        try:
            response = requests.post(endpoint, json=payload, headers=self.headers)
            response.raise_for_status()  # Raise an exception for bad status codes
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error submitting URL: {e}")
            return {"error": str(e)}
    
    def get_product_info(self, product_id: str) -> Dict:
        """
        Get product information from the Jogg API
        
        Args:
            product_id (str): The product ID to get information for
            
        Returns:
            Dict: The API response containing product information
        """
        endpoint = f"{self.base_url}/product/{product_id}"
        
        try:
            response = requests.get(endpoint, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error getting product info: {e}")
            return {"error": str(e)}
    
    def update_product_info(self, product_id: str, data: Dict) -> Dict:
        """
        Update product information in the Jogg API
        
        Args:
            product_id (str): The product ID to update
            data (Dict): Dictionary containing fields to update:
                - name (str): Product name
                - description (str): Product description
                - target_audience (str): Target audience description
                - media (list): List of media objects
                
        Returns:
            Dict: The API response
        """
        endpoint = f"{self.base_url}/product"
        
        # Create payload with product_id
        payload = {
            "product_id": product_id,
            "name": data.get("name", ""),
            "description": data.get("description", ""),
            "target_audience": data.get("target_audience", ""),
            "media": data.get("media", [])
        }
        
        try:
            response = requests.put(endpoint, json=payload, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error updating product info: {e}")
            return {"error": str(e)}

def main():
    # Initialize the API with your key
    api = JoggAPI()
    
    # Submit De Soi URL
    url = "http://www.drinkdesoi.com"
    print(f"\nSubmitting URL: {url}")
    
    response = api.submit_product_url(url)
    print("\nAPI Response:")
    print(json.dumps(response, indent=2))
    
    # If successful, try updating product info
    if response.get('code') == 0:
        product_id = response.get('data', {}).get('product_id')
        if product_id:
            # Try updating the product info
            update_data = {
                "name": "De Soi Non-Alcoholic Apéritifs",
                "description": "De Soi is a line of non-alcoholic apéritifs crafted with natural adaptogens for a sophisticated drinking experience. Each blend combines unique botanicals to deliver complex flavors and functional benefits. Our beverages are designed to help you relax and unwind without alcohol, making them perfect for social occasions or mindful moments.",
                "target_audience": "Sophisticated consumers seeking non-alcoholic alternatives that don't compromise on taste or experience. This includes mindful drinkers, wellness enthusiasts, and those who appreciate the ritual and sophistication of traditional cocktails without the alcohol.",
                "media": [
                    {
                        "type": 1,
                        "name": "product_collection.jpg",
                        "url": "https://www.drinkdesoi.com/cdn/shop/files/De-Soi-Non-Alcoholic-Aperitifs-Collection.jpg",
                        "description": "De Soi's elegant collection of non-alcoholic apéritifs, featuring natural adaptogens and sophisticated botanical blends."
                    }
                ]
            }
            
            print(f"\nUpdating product info for ID: {product_id}")
            update_response = api.update_product_info(product_id, update_data)
            print("\nUpdate Response:")
            print(json.dumps(update_response, indent=2))
            
            # Get the updated product info
            print(f"\nGetting updated product info for ID: {product_id}")
            product_info = api.get_product_info(product_id)
            print("\nUpdated Product Info:")
            print(json.dumps(product_info, indent=2))

if __name__ == "__main__":
    main()
