import csv
import requests
from typing import Dict, Optional
import os
from dotenv import load_dotenv

class LeadProcessor:
    def __init__(self, api_key: str = None):
        if api_key is None:
            # Load environment variables
            load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
            api_key = os.getenv('JOGG_API_KEY')
            if not api_key:
                raise ValueError("JOGG_API_KEY not found in environment variables")
        
        self.api_key = api_key
        self.leads = []
        self.headers = {
            'x-api-key': self.api_key,
            'Content-Type': 'application/json'
        }
        self.base_url = "https://api.jogg.ai/v1"

    def load_leads(self, csv_path: str) -> None:
        """Load leads from CSV file."""
        with open(csv_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            self.leads = list(reader)
        print(f"Loaded {len(self.leads)} leads from CSV")

    def submit_url(self, url: str) -> Optional[Dict]:
        """Submit a URL to the Jogg API."""
        endpoint = f"{self.base_url}/products"
        try:
            response = requests.post(
                endpoint,
                headers=self.headers,
                json={"url": url}
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error submitting URL {url}: {str(e)}")
            return None

    def process_leads(self) -> None:
        """Process each lead and submit their website URL."""
        successful = 0
        failed = 0

        for lead in self.leads:
            # Try different possible URL fields
            url = None
            email = None
            
            # Check companyDomain first
            if lead.get('companyDomain'):
                url = f"https://{lead['companyDomain']}"
            # Then check organization URLs
            elif lead.get('organization_facebook_url'):
                url = lead['organization_facebook_url']
            elif lead.get('organization_twitter_url'):
                url = lead['organization_twitter_url']
            
            # Get email
            email = lead.get('email') or lead.get('personal_emails_0')
            
            if not url or not email:
                print(f"Skipping lead {lead.get('name')}: Missing website or email")
                continue

            # Submit URL to Jogg API
            result = self.submit_url(url)
            if result:
                successful += 1
            else:
                failed += 1

        print("\nProcessing Summary:")
        print("==================")
        print(f"\nTotal processed: {successful + failed}")
        print(f"Successful: {successful}")
        print(f"Failed: {failed}")

def main():
    # Load environment variables
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        print("Error: JOGG_API_KEY not found in environment variables")
        exit(1)
    
    # Initialize processor with API key
    processor = LeadProcessor(api_key)
    
    # Load and process leads
    processor.load_leads("../lead-input/APOLLOCLEANSHOPIFYOWNERS.csv")
    processor.process_leads()

if __name__ == "__main__":
    main()
