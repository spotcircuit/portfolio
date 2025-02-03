import requests
import json
import os
from dotenv import load_dotenv
from jogg_api import JoggAPIClient

def check_styles():
    # Load environment variables
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        print("Error: JOGG_API_KEY not found in environment variables")
        exit(1)

    client = JoggAPIClient(api_key)
    
    print("\nChecking visual styles...")
    response = client.visual_styles.list_styles()
    if response and response.get('code') == 0:
        styles = response['data'].get('styles', [])
        print(f"\nFound {len(styles)} visual styles:")
        for i, style in enumerate(styles, 1):
            print(f"\n{i}. {style['name']}")
            if 'description' in style:
                print(f"   Description: {style['description']}")
    else:
        print("Failed to get visual styles")
        print(response)

if __name__ == "__main__":
    check_styles()
