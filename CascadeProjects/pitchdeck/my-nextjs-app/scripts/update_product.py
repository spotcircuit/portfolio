import json
import os
from product_api import JoggAPI
from update_lead_status import update_lead_interaction

def load_lead_config(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_lead_config(config, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)

def update_product_info():
    # Paths
    lead_config_file = r'C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\my-nextjs-app\lead_config.json'
    
    # Load current lead config
    lead_config = load_lead_config(lead_config_file)
    
    # Get product_id from apollo_data
    product_id = lead_config.get('lead', {}).get('apollo_data', {}).get('product_id')
    if not product_id:
        print("No product_id found in lead_config.json!")
        return
    
    # Initialize Jogg API
    api = JoggAPI()
    
    # Get product info
    print(f"Getting product info for ID: {product_id}")
    response = api.get_product_info(product_id)
    
    if response.get('code') == 0:
        product_data = response.get('data', {})
        
        # Update product section in lead_config
        lead_config['product'] = {
            'name': product_data.get('name', ''),
            'description': product_data.get('description', ''),
            'target_audience': product_data.get('target_audience', ''),
            'media': product_data.get('media', [])
        }
        
        # Save updated lead config
        save_lead_config(lead_config, lead_config_file)
        print("Updated product info in lead_config.json")
        
        # Update interaction history
        email = lead_config.get('lead', {}).get('email')
        if email:
            update_lead_interaction(
                email=email,
                interaction_type="product_info",
                status="success",
                details={
                    "product_id": product_id,
                    "product_name": product_data.get('name')
                }
            )
    else:
        print(f"Error getting product info: {response.get('error', 'Unknown error')}")
        # Update interaction history for failure
        email = lead_config.get('lead', {}).get('email')
        if email:
            update_lead_interaction(
                email=email,
                interaction_type="product_info",
                status="failed",
                details={
                    "product_id": product_id,
                    "error": response.get('error', 'Unknown error')
                }
            )

if __name__ == "__main__":
    update_product_info()
