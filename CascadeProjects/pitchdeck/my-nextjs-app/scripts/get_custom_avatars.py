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
    
    print(f"Fetching custom avatars from {url}")
    response = requests.get(url, headers=headers)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print("\nResponse Data:")
        print(json.dumps(data, indent=2))
        
        # Save response to file
        output_file = "custom_avatars.json"
        with open(output_file, "w") as f:
            json.dump(data, f, indent=2)
        print(f"\nResponse saved to {output_file}")
    else:
        print(f"Error: {response.text}")

if __name__ == "__main__":
    main()
