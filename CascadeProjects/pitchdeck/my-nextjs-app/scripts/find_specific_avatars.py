import requests
import json
from datetime import datetime
import re
import os
from dotenv import load_dotenv

def main():
    # Load environment variables
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        print("Error: JOGG_API_KEY not found in environment variables")
        exit(1)

    headers = {"x-api-key": api_key}

    # Names to search for
    name_patterns = [
        r'brian',
        r'brian\s*pyatt\s*\d*',  # Will match "Brian Pyatt", "BrianPyatt", "Brian Pyatt2", etc.
        r'mayra\s*\d*',          # Will match "Mayra", "Mayra1", "Mayra 2", etc.
    ]

    def get_avatars(url):
        response = requests.request("GET", url, headers=headers)
        return response.json()

    # Get avatars from all endpoints
    endpoints = [
        ("Custom Avatars", "https://api.jogg.ai/v1/avatars/custom"),
        ("All Avatars", "https://api.jogg.ai/v1/avatars"),
        ("My Avatars", "https://api.jogg.ai/v1/avatars/my"),
        ("Instant Avatars", "https://api.jogg.ai/v1/avatars/instant")
    ]

    # Function to check if name matches any search terms
    def matches_search(name):
        name_lower = name.lower()
        return any(re.search(pattern, name_lower) for pattern in name_patterns)

    # Function to extract date from URL
    def get_date_from_url(url):
        match = re.search(r'/202\d-\d{2}-\d{2}/', url)
        return match.group(0).strip('/') if match else None

    # Open a file to write results
    with open('avatar_matches.txt', 'w') as f:
        # Write timestamp
        f.write(f"Avatar Search Results - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        # Check each endpoint
        for endpoint_name, url in endpoints:
            try:
                response = get_avatars(url)
                f.write(f"\nMatches from {endpoint_name}:\n")
                f.write("-" * 50 + "\n")
                
                if response.get('data') and response['data'].get('avatars'):
                    for avatar in response['data']['avatars']:
                        if matches_search(avatar['name']):
                            date = get_date_from_url(avatar['cover_url'])
                            f.write(f"Name: {avatar['name']}\n")
                            f.write(f"ID: {avatar['avatar_id']}\n")
                            f.write(f"Status: {avatar['status']}\n")
                            f.write(f"Created: {date if date else 'Unknown'}\n")
                            f.write(f"URL: {avatar['cover_url']}\n")
                            f.write("-" * 30 + "\n")
                else:
                    f.write("No avatars found or invalid response format\n")
                    f.write(f"Response: {json.dumps(response, indent=2)}\n")
            except Exception as e:
                f.write(f"Error accessing {endpoint_name}: {str(e)}\n")

    print("Results written to avatar_matches.txt")

if __name__ == "__main__":
    main()
