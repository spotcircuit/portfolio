import requests
import json
import os
from dotenv import load_dotenv

def main():
    # Load environment variables
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        print("Error: JOGG_API_KEY not found in environment variables")
        exit(1)

    url = "https://api.jogg.ai/v1/avatars/custom"
    headers = {"x-api-key": api_key}
    
    print(f"Fetching avatars from {url}")
    response = requests.get(url, headers=headers)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        if data.get('code') == 0 and 'data' in data:
            avatars = data['data'].get('avatars', [])
            for avatar in avatars:
                print(avatar.get('cover_url'))
    else:
        print(f"Error: {response.text}")

if __name__ == "__main__":
    main()
