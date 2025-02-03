import json
import os
from datetime import datetime
from product_api import JoggAPI
from scripts.utils.config import config

def load_apollo_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_apollo_data(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def load_lead_config(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_lead_config(config, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)

def load_script_template():
    script_path = config.get_file_path('files', 'script_template.txt')
    with open(script_path, 'r', encoding='utf-8') as f:
        return f.read()

def get_next_lead():
    # Paths
    apollo_file = config.get_file_path('files', 'apollo_data.json')
    lead_config_file = config.get_file_path('files', 'lead_config.json')
    
    # Load apollo data
    apollo_data = load_apollo_data(apollo_file)
    
    # Find first unprocessed lead
    next_lead = None
    for lead in apollo_data['leads']:
        if not lead.get('processed', False):
            # Skip leads marked as BADINFO
            if lead.get('BADINFO'):
                lead['processed'] = True
                lead['processed_at'] = datetime.now().isoformat()
                continue
            
            next_lead = lead
            lead['processed'] = True
            lead['processed_at'] = datetime.now().isoformat()
            
            # Initialize interactions array if it doesn't exist
            if 'interactions' not in lead:
                lead['interactions'] = []
            
            break
    
    if next_lead is None:
        print("No unprocessed leads found!")
        return
    
    # Get company website from links
    company_website = None
    if 'links' in next_lead:
        if 'organization_website_' in next_lead['links']:
            company_website = next_lead['links']['organization_website_']
        elif 'website' in next_lead['links']:
            company_website = next_lead['links']['website']
    
    # Get product_id from Jogg API if not already stored
    if company_website and not next_lead.get('product_id'):
        api = JoggAPI()
        response = api.submit_product_url(company_website)
        if response.get('code') == 0:
            product_id = response.get('data', {}).get('product_id')
            if product_id:
                next_lead['product_id'] = product_id
                # Record the product ID fetch in interactions
                next_lead['interactions'].append({
                    'type': 'product_fetch',
                    'status': 'success',
                    'timestamp': datetime.now().isoformat(),
                    'product_id': product_id
                })
    
    # Save updated apollo data with product_id and interaction
    save_apollo_data(apollo_data, apollo_file)
    
    # Load current lead config
    lead_config = load_lead_config(lead_config_file)
    
    if company_website:
        # Remove http:// or https:// and www. for display
        display_website = company_website.replace('http://', '').replace('https://', '').replace('www.', '')
    else:
        display_website = ''
    
    # Map Apollo fields to our existing field names
    lead_config['lead'] = {
        "first_name": next_lead.get('firstname', ''),
        "last_name": next_lead.get('lastname', ''),
        "company_name": next_lead.get('company', ''),
        "company_website": display_website,
        "job_title": next_lead.get('title', ''),
        "email": next_lead.get('email', ''),
        # Store original Apollo data in a separate section
        "apollo_data": {
            "phone": next_lead.get('phone', ''),
            "city": next_lead.get('city', ''),
            "country": next_lead.get('country', ''),
            "headline": next_lead.get('headline', ''),
            "links": next_lead.get('links', {}),
            "metadata": next_lead.get('metadata', {}),
            "product_id": next_lead.get('product_id'),  # Include product_id in apollo_data
            "interactions": next_lead.get('interactions', [])  # Include interaction history
        }
    }
    
    # Load and fill script template
    script_template = load_script_template()
    filled_script = script_template.replace('{{FirstName}}', next_lead.get('firstname', ''))
    filled_script = filled_script.replace('{{CompanyName}}', next_lead.get('company', ''))
    filled_script = filled_script.replace('{{JobTitle}}', next_lead.get('title', ''))
    filled_script = filled_script.replace('{{CompanyWebsite}}', display_website)
    
    # Add video section with filled script
    lead_config['video'] = {
        "avatar_id": 113443,
        "avatar_type": 1,
        "language": "english",
        "voice_id": "tb_713b5f8c78e84c3ebb812651db6d2a6d",
        "aspect_ratio": 0,
        "template_type": "public",
        "video_length": "30",
        "caption": True,
        "override_script": filled_script,
        "visual_style": None,
        "template_id": None,
        "music_id": None
    }
    
    # Save updated lead config
    save_lead_config(lead_config, lead_config_file)
    
    print(f"Updated lead_config.json with lead: {next_lead.get('firstname')} {next_lead.get('lastname')}")
    print(f"Company: {next_lead.get('company')}")
    print(f"Title: {next_lead.get('title')}")
    print(f"Email: {next_lead.get('email')}")
    if company_website:
        print(f"Website: {display_website}")
        if next_lead.get('product_id'):
            print(f"Product ID: {next_lead['product_id']}")
    print("\nGenerated Script:")
    print(filled_script)

if __name__ == "__main__":
    get_next_lead()
