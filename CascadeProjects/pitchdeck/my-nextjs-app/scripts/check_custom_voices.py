import requests
import json
import os
from dotenv import load_dotenv
from jogg_api import JoggAPIClient

def main():
    # Load environment variables
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        print("Error: JOGG_API_KEY not found in environment variables")
        exit(1)

    client = JoggAPIClient(api_key)
    
    print("\nChecking custom voices...")
    response = client.voices.list_custom_voices()
    
    print("\nResponse:")
    print(json.dumps(response, indent=2))
    
    # Save response to file
    output_file = "custom_voices_response.json"
    with open(output_file, "w") as f:
        json.dump(response, f, indent=2)
    print(f"\nResponse saved to {output_file}")

if __name__ == "__main__":
    main()
