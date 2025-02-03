#!/usr/bin/env python3
"""Get the next unprocessed lead."""

import json
import os
from datetime import datetime
from typing import Dict, Any, Optional
import sys

# Add the project root to the Python path using Windows-style paths
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
sys.path.insert(0, project_root)

from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

def load_apollo_data() -> Dict[str, Any]:
    """Load Apollo data from JSON file."""
    apollo_file = config.get_file_path('apollo_data')
    try:
        with open(apollo_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        logger.warning(f"Apollo data file not found at: {apollo_file}")
        return {"leads": []}

def save_apollo_data(data: Dict[str, Any]) -> None:
    """Save Apollo data to JSON file."""
    apollo_file = config.get_file_path('apollo_data')
    os.makedirs(os.path.dirname(apollo_file), exist_ok=True)
    with open(apollo_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

def save_current_lead(lead: Dict[str, Any]) -> None:
    """Save the current lead to lead.json."""
    lead_file = config.get_file_path('lead')
    
    # Transform apollo data format to our lead config format
    lead_data = {
        "lead": {
            "first_name": lead.get('firstname'),
            "last_name": lead.get('lastname'),
            "company_name": lead.get('company'),
            "company_website": lead.get('links', {}).get('organization_website_', '').replace('http://', '').replace('https://', '').rstrip('/'),
            "job_title": lead.get('title'),
            "email": lead.get('email'),
            "apollo_data": {
                "phone": lead.get('phone'),
                "city": lead.get('city'),
                "country": lead.get('country'),
                "headline": lead.get('headline'),
                "links": lead.get('links', {}),
                "metadata": lead.get('metadata', {})
            }
        }
    }
    
    # Save to lead file
    os.makedirs(os.path.dirname(lead_file), exist_ok=True)
    with open(lead_file, 'w', encoding='utf-8') as f:
        json.dump(lead_data, f, indent=2)

def get_next_lead() -> Optional[Dict[str, Any]]:
    """
    Get the next unprocessed lead from Apollo data.
    
    Returns:
        Lead data if found, None otherwise
    """
    try:
        # Load Apollo data
        data = load_apollo_data()
        leads = data.get('leads', [])
        
        if not leads:
            logger.warning("No leads found in Apollo data")
            return None
        
        # Find next unprocessed lead
        for lead in leads:
            if not lead.get('processed'):
                # Update lead status in apollo_data.json
                lead['processed'] = True
                lead['processed_at'] = datetime.now().isoformat()
                save_apollo_data(data)
                
                # Update current lead in lead.json
                save_current_lead(lead)
                
                logger.info(f"Found next lead: {lead.get('firstname')} {lead.get('lastname')} ({lead.get('company')})")
                return lead
        
        logger.info("No more unprocessed leads found")
        return None
        
    except Exception as e:
        logger.error(f"Error getting next lead: {str(e)}")
        return None

if __name__ == "__main__":
    try:
        lead = get_next_lead()
        if lead:
            print(json.dumps(lead, indent=2))
        else:
            print("No unprocessed lead found")
    except Exception as e:
        logger.error(f"Error in main: {str(e)}")
        sys.exit(1)
