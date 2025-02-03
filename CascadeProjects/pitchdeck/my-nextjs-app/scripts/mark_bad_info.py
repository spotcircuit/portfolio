import json
from datetime import datetime

def mark_bad_leads():
    # Load apollo data
    with open(r'C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\lead-input\apollo_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    bad_count = 0
    total_count = len(data['leads'])
    
    for lead in data['leads']:
        is_bad = False
        reason = []
        
        # Check email
        if not lead.get('email'):
            is_bad = True
            reason.append('Missing email')
            
        # Check company URL
        if not lead.get('links') or not any(k for k in lead['links'].keys() if 'website' in k.lower()):
            is_bad = True
            reason.append('Missing company URL')
        
        if is_bad:
            lead['BADINFO'] = ', '.join(reason)
            lead['processed'] = True
            lead['processed_at'] = datetime.now().isoformat()
            bad_count += 1
    
    # Save updated data
    with open(r'C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\lead-input\apollo_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Found {bad_count} leads with bad info out of {total_count} total leads")

if __name__ == "__main__":
    mark_bad_leads()
