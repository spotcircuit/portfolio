#!/usr/bin/env python3
import json
import os
import sys
from datetime import datetime
from dotenv import load_dotenv

# Add project root to Python path
project_root = os.path.dirname(__file__)
sys.path.insert(0, project_root)

# Load environment variables
load_dotenv(os.path.join(project_root, '.env.local'))

from scripts.utils.config import config
from scripts.utils.logging import setup_logging
from scripts.jogg_api.client import api_client

logger = setup_logging(__name__)

def update_apollo_data(product_id: str, lead_data: dict):
    """Update apollo_data.json with the product ID."""
    try:
        apollo_file = config.get_file_path('apollo_data')
        with open(apollo_file, 'r', encoding='utf-8') as f:
            apollo_data = json.load(f)
        
        # Find the matching lead in apollo_data
        lead_email = lead_data.get('lead', {}).get('email')
        for lead in apollo_data.get('leads', []):
            if lead.get('email') == lead_email:
                lead['product_id'] = product_id
                break
        
        # Write updated apollo_data back to file
        with open(apollo_file, 'w', encoding='utf-8') as f:
            json.dump(apollo_data, f, indent=2)
            
    except Exception as e:
        logger.error(f"Error updating apollo_data.json: {str(e)}")

def submit_url(url: str = None, api_key: str = None):
    """Submit a URL to the Jogg API to get a product ID."""
    if api_key:
        api_client.api_key = api_key
    
    # Load current lead
    lead_file = config.get_file_path('lead')
    with open(lead_file, 'r', encoding='utf-8') as f:
        lead_data = json.load(f)
    
    # Get website URL from lead data
    url = url or lead_data.get('lead', {}).get('company_website')
    if not url:
        logger.error("No URL provided or found in lead data")
        return None
    
    # Add http:// if not present
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    try:
        response_data = api_client.post('product', json_data={"url": url})
        
        if response_data.get('code') == 0:
            product_id = response_data.get('data', {}).get('product_id')
            
            # Update lead.json
            lead_data['lead']['product_id'] = product_id
            with open(lead_file, 'w', encoding='utf-8') as f:
                json.dump(lead_data, f, indent=2)
            
            # Update apollo_data.json
            update_apollo_data(product_id, lead_data)
            
            # Save API response
            responses_dir = config.get_path('responses_dir')
            os.makedirs(responses_dir, exist_ok=True)
            
            response_file = os.path.join(responses_dir, 'product_response.json')
            with open(response_file, 'w', encoding='utf-8') as f:
                json.dump(response_data, f, indent=2)
            
            logger.info(f"Product ID: {product_id}")
            logger.info(f"Response saved to {response_file}")
        
        return response_data
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    result = submit_url()
    if result and result.get('code') == 0:
        print(json.dumps(result, indent=2))
        sys.exit(0)
    else:
        sys.exit(1)
