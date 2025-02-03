import json
from datetime import datetime

def update_apollo():
    # Load apollo data
    with open(r'C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\lead-input\apollo_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Update first lead
    data['leads'][0]['BADINFO'] = 'Missing email'
    data['leads'][0]['processed'] = True
    data['leads'][0]['processed_at'] = datetime.now().isoformat()
    
    # Save updated data
    with open(r'C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\lead-input\apollo_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    update_apollo()
