#!/usr/bin/env python3
import json
import os
import sys
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

def update_product(product_id: str = None, target_audience: str = None, api_key: str = None):
    """Update a product in the Jogg API."""
    if api_key:
        api_client.api_key = api_key
    
    # Load current lead
    lead_file = config.get_file_path('lead')
    with open(lead_file, 'r', encoding='utf-8') as f:
        lead_data = json.load(f)
    
    # Use provided product_id or from lead data
    product_id = product_id or lead_data.get('lead', {}).get('product_id')
    if not product_id:
        logger.error("No product ID provided or found in lead data")
        return None
    
    payload = {
        "product_id": product_id,
        "name": lead_data.get('lead', {}).get('company_name', ''),
        "description": "",
        "target_audience": target_audience or "",
        "media": [
            {
                "type": 1,
                "name": "media.jpg",
                "url": "",
                "description": ""
            }
        ]
    }
    
    try:
        response_data = api_client.put('product', json_data=payload)
        return response_data
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    result = update_product()
    if result and result.get('code') == 0:
        print(json.dumps(result, indent=2))
        sys.exit(0)
    else:
        sys.exit(1)
