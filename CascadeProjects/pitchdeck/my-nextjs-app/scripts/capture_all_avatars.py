import requests
import json
import os
from dotenv import load_dotenv
from datetime import datetime

def capture_avatars():
    # Load environment variables
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        print("Error: JOGG_API_KEY not found in environment variables")
        exit(1)

    headers = {"x-api-key": api_key}
    
    # List of endpoints to check
    endpoints = [
        ("Custom Avatars", "https://api.jogg.ai/v1/avatars/custom"),
        ("All Avatars", "https://api.jogg.ai/v1/avatars"),
        ("My Avatars", "https://api.jogg.ai/v1/avatars/my"),
        ("Instant Avatars", "https://api.jogg.ai/v1/avatars/instant")
    ]
    
    # Create a timestamp for the output fileCategoryInfo          : WriteError: (C:\Users\Big Da...om_avatars.json:F  
       ileInfo) [Move-Item], IOException
        + FullyQualifiedErrorId : MoveFileInfoItemIOError,Microsoft.PowerShell.Com  
       mands.MoveItemCommand
    
    PS C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\my-nextjs-app>
    Exit Code 0
    Now let's start
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"avatar_responses_{timestamp}.json"
    
    all_responses = {}
    for name, url in endpoints:
        print(f"\nChecking {name} at {url}")
        response = requests.get(url, headers=headers)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            all_responses[name] = data
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: {response.text}")
            all_responses[name] = {"error": response.text}
    
    # Save all responses to file
    with open(output_file, "w") as f:
        json.dump(all_responses, f, indent=2)
    print(f"\nAll responses saved to {output_file}")

if __name__ == "__main__":
    capture_avatars()
