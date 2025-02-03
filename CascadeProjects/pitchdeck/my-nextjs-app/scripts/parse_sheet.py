import pandas as pd
import numpy as np
from urllib.parse import unquote
import os
import chardet
import json
import re

def clean_number(value):
    """Clean number strings by removing special characters and converting to float"""
    if pd.isna(value):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    
    value_str = str(value)
    if 'x' in value_str.lower():
        value_str = value_str.split('x')[0]
    
    for char in ['+', '-', '/', '|', '\\', '(', ')', ' ']:
        value_str = value_str.replace(char, '')
    
    number_match = re.search(r'\d+\.?\d*', value_str)
    if number_match:
        return float(number_match.group())
    
    return None

def clean_url(value):
    """Clean and decode URLs, handling special characters"""
    if pd.isna(value):
        return None
    
    value_str = str(value).strip()
    
    if not any(value_str.lower().startswith(prefix) for prefix in ['http://', 'https://', 'www.']):
        if 'www.' in value_str.lower():
            value_str = 'http://' + value_str[value_str.lower().index('www.'):]
        elif '.com' in value_str.lower() or '.org' in value_str.lower() or '.net' in value_str.lower():
            value_str = 'http://' + value_str
    
    value_str = value_str.split('|')[0].strip()
    return unquote(value_str)

def clean_title(value):
    """Clean and standardize job titles"""
    if pd.isna(value):
        return None
    
    value_str = str(value).strip()
    value_str = ' '.join(value_str.split())
    value_str = value_str.replace(' @ ', '@')
    value_str = value_str.replace(' |', '|')
    value_str = value_str.replace('| ', '|')
    
    return value_str

def clean_headline(value):
    """Clean and standardize headlines/bios"""
    if pd.isna(value):
        return None
    
    value_str = str(value).strip()
    value_str = ' '.join(value_str.split())
    value_str = re.sub(r'\s+#', ' #', value_str)
    
    return value_str

def clean_company_name(value):
    """Clean and validate company names, filtering out year-only values"""
    if pd.isna(value):
        return None
    
    value_str = str(value).strip()
    
    # Check if it's just a year (4 digits)
    if re.match(r'^\d{4}$', value_str):
        return None
    
    # Clean up common issues
    value_str = value_str.replace('|', '').strip()
    value_str = ' '.join(value_str.split())  # Normalize whitespace
    
    return value_str if value_str else None

def sanitize_lead(record):
    """Clean and validate lead data, marking BADINFO if necessary"""
    # Initialize BADINFO as None
    bad_info = None
    
    # Check and clean email
    if not record.get('email'):
        bad_info = "Missing email"
    
    # Check and clean company name
    company = record.get('company')
    if isinstance(company, str) and re.match(r'^\d{4}$', company):
        # If company is just a year, try to get from metadata
        if record.get('metadata', {}).get('organization_name'):
            record['company'] = record['metadata']['organization_name']
        else:
            record['company'] = None
    
    # Check for company website
    has_website = False
    if record.get('links'):
        for key in record['links']:
            if 'website' in key.lower() or key.lower() == 'organization_website_':
                has_website = True
                break
    
    if not has_website:
        bad_info = bad_info or "Missing company URL"
    
    # Clean phone number
    if record.get('phone'):
        phone = str(record['phone'])
        # Remove all non-digit characters
        phone = re.sub(r'\D', '', phone)
        if phone:
            # Format as +1XXXXXXXXXX
            record['phone'] = f"+{phone}" if not phone.startswith('+') else phone
    
    # Clean title
    if record.get('title'):
        record['title'] = clean_title(record['title'])
    
    # Add BADINFO if any issues were found
    if bad_info:
        record['BADINFO'] = bad_info
    
    return record

def parse_sheet(file_path):
    try:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
        
        encoding = chardet.detect(open(file_path, 'rb').read())['encoding']
        df = pd.read_csv(file_path, encoding=encoding, dtype=str)
        
        # Clean up column names
        df.columns = df.columns.str.strip().str.lower()
        
        # Convert DataFrame to list of dictionaries
        records = []
        for _, row in df.iterrows():
            record = {}
            
            # Basic info
            for field in ['firstname', 'lastname', 'email', 'phone']:
                if field in row:
                    record[field] = row[field] if not pd.isna(row[field]) else None
            
            # Title and role info
            title_fields = [col for col in df.columns if any(word in col for word in ['title', 'position', 'role'])]
            if title_fields:
                record['title'] = clean_title(row[title_fields[0]])
            
            # Company info
            company_fields = [col for col in df.columns if any(word in col for word in ['company', 'organization', 'business'])]
            if company_fields:
                record['company'] = row[company_fields[0]] if not pd.isna(row[company_fields[0]]) else None
            
            # Location info
            for field in ['city', 'country']:
                if field in row:
                    record[field] = row[field] if not pd.isna(row[field]) else None
            
            # Social and web links
            record['links'] = {}
            
            # LinkedIn URL
            linkedin_fields = [col for col in df.columns if 'linkedin' in col.lower()]
            if linkedin_fields:
                linkedin_url = clean_url(row[linkedin_fields[0]])
                if linkedin_url:
                    record['links']['linkedin'] = linkedin_url
            
            # Other URLs
            url_fields = [col for col in df.columns if any(term in col.lower() for term in ['url', 'website', 'twitter', 'facebook'])]
            for field in url_fields:
                if 'linkedin' not in field.lower():  # Skip LinkedIn as it's already handled
                    url = clean_url(row[field])
                    if url:
                        field_name = field.split('url')[0].strip() if 'url' in field.lower() else field
                        record['links'][field_name] = url
            
            # Headline or bio
            headline_fields = [col for col in df.columns if any(word in col for word in ['headline', 'bio', 'about', 'description'])]
            if headline_fields:
                record['headline'] = clean_headline(row[headline_fields[0]])
            
            # Additional metadata
            record['metadata'] = {}
            for col in df.columns:
                if col not in record and not any(term in col for term in ['firstname', 'lastname', 'email', 'phone', 'title', 'company', 'city', 'country', 'linkedin', 'url', 'website', 'headline', 'bio']):
                    value = row[col]
                    if not pd.isna(value):
                        # Try to convert to number if it looks like one
                        if any(c.isdigit() for c in str(value)):
                            cleaned_num = clean_number(value)
                            if cleaned_num is not None:
                                record['metadata'][col] = cleaned_num
                                continue
                        record['metadata'][col] = value
            
            # Remove empty metadata
            if not record['metadata']:
                del record['metadata']
            
            # Remove empty links
            if not record['links']:
                del record['links']
            
            # Clean and validate the record
            record = sanitize_lead(record)
            
            records.append(record)
        
        return records
    
    except Exception as e:
        print(f"Error in parse_sheet: {str(e)}")
        raise

def main():
    try:
        # Path to the CSV file
        file_path = r'C:\Users\Big Daddy Pyatt\CascadeProjects\pitchdeck\lead-input\APOLLOCLEANSHOPIFYOWNERS.csv'
        
        # Parse the sheet
        records = parse_sheet(file_path)
        
        # Save as JSON
        output_dir = os.path.dirname(file_path)
        output_file = os.path.join(output_dir, 'apollo_data.json')
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump({
                'leads': records,
                'total': len(records),
                'source': 'apollo',
                'timestamp': pd.Timestamp.now().isoformat()
            }, f, indent=2, ensure_ascii=False)
        
        print(f"\nData saved to {output_file}")
        print(f"Total records processed: {len(records)}")
        
    except Exception as e:
        print(f"Error in main: {str(e)}")

if __name__ == "__main__":
    main()
