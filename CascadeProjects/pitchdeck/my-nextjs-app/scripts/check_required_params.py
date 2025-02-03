import requests
import json
import os
from dotenv import load_dotenv
from jogg_api import JoggAPIClient

def check_params():
    # Load environment variables
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        print("Error: JOGG_API_KEY not found in environment variables")
        exit(1)

    client = JoggAPIClient(api_key)
    
    print("\nChecking templates...")
    templates = client.templates.list_templates()
    if templates and templates.get('code') == 0:
        print("\nAvailable Templates:")
        for template in templates['data'].get('templates', []):
            print(f"- {template.get('name')} (ID: {template.get('id')})")
            if 'description' in template:
                print(f"  Description: {template['description']}")
    
    print("\nChecking script styles...")
    styles = client.visual_styles.list_styles()
    if styles and styles.get('code') == 0:
        print("\nAvailable Script Styles:")
        for style in styles['data'].get('styles', []):
            print(f"- {style.get('name')}")
            if 'description' in style:
                print(f"  Description: {style['description']}")
    
    print("\nChecking target audiences...")
    # This would be a call to get available target audiences if the API supports it
    
    print("\nChecking other parameters...")
    # Try to make a minimal video generation request to see required fields
    try:
        minimal_config = {
            "product_id": "test",
            "avatar_id": 113443,
            "avatar_type": 1,
            "voice_id": "tb_713b5f8c78e84c3ebb812651db6d2a6d",
            "aspect_ratio": 0,
            "video_length": "30",
            "language": "english",
            "caption": True
        }
        response = client.videos.generate(minimal_config)
        print("\nAPI Response for minimal config:")
        print(json.dumps(response, indent=2))
    except Exception as e:
        print(f"\nError testing minimal config: {str(e)}")

if __name__ == "__main__":
    check_params()
