import json
import os
from product_api import JoggAPI
from update_lead_status import update_lead_interaction

def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def update_target_audience(audience_key="default"):
    """
    Update the target audience for the product using the specified audience key
    
    Args:
        audience_key (str): Key from target_audiences.json to use. Default is "default"
    """
    # Paths
    lead_config_file = r'C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\my-nextjs-app\lead_config.json'
    target_audiences_file = r'C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\my-nextjs-app\target_audiences.json'
    
    # Load configurations
    lead_config = load_json(lead_config_file)
    target_audiences = load_json(target_audiences_file)
    
    # Get target audience text
    target_audience = target_audiences.get(audience_key)
    if not target_audience:
        print(f"Error: Target audience key '{audience_key}' not found!")
        print("Available keys:", list(target_audiences.keys()))
        return
    
    # Get product_id from apollo_data
    product_id = lead_config.get('lead', {}).get('apollo_data', {}).get('product_id')
    if not product_id:
        print("No product_id found in lead_config.json!")
        return
    
    # Initialize Jogg API
    api = JoggAPI()
    
    # Update product info with just the target audience
    update_data = {
        "product_id": product_id,
        "target_audience": target_audience
    }
    
    print(f"\nUpdating target audience to '{audience_key}'")
    update_response = api.update_product_info(product_id, update_data)
    
    if update_response.get('code') == 0:
        print("Successfully updated target audience!")
        
        # Update interaction history
        email = lead_config.get('lead', {}).get('email')
        if email:
            update_lead_interaction(
                email=email,
                interaction_type="target_audience_update",
                status="success",
                details={
                    "product_id": product_id,
                    "audience_key": audience_key
                }
            )
    else:
        print("Error updating target audience:", update_response.get('msg', 'Unknown error'))

def list_target_audiences():
    """List all available target audience options"""
    target_audiences_file = r'C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\my-nextjs-app\target_audiences.json'
    target_audiences = load_json(target_audiences_file)
    
    print("\nAvailable Target Audiences:")
    for key, text in target_audiences.items():
        print(f"\n{key}:")
        print(text)

if __name__ == "__main__":
    # Update with COO audience
    update_target_audience("coo")
