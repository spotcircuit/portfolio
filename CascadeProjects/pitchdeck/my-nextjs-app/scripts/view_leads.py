import csv

def view_leads(csv_path, num_leads=10):
    with open(csv_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        print("\nFirst 10 Leads Data:")
        print("===================")
        
        for i, lead in enumerate(reader):
            if i >= num_leads:
                break
                
            print(f"\nLead {i+1}:")
            print(f"Name: {lead.get('name', 'N/A')}")
            print(f"Email: {lead.get('email', 'N/A')}")
            print(f"Personal Email: {lead.get('personal_emails_0', 'N/A')}")
            print(f"Company Name: {lead.get('companyName', 'N/A')}")
            print(f"Company Domain: {lead.get('companyDomain', 'N/A')}")
            print("\nSocial/Web URLs:")
            print(f"LinkedIn: {lead.get('linkedinUrl', 'N/A')}")
            print(f"Organization Facebook: {lead.get('organization_facebook_url', 'N/A')}")
            print(f"Organization Twitter: {lead.get('organization_twitter_url', 'N/A')}")
            print("-" * 50)

if __name__ == "__main__":
    view_leads("../lead-input/APOLLOCLEANSHOPIFYOWNERS.csv")
