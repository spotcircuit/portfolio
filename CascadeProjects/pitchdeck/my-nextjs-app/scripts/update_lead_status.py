#!/usr/bin/env python3
"""Script to update lead status in Apollo data."""

import json
import sys
from typing import Dict, Any, List
from scripts.utils.config import config
from scripts.utils.logging import setup_logging
from datetime import datetime

logger = setup_logging(__name__)

def load_apollo_data() -> List[Dict[str, Any]]:
    """Load Apollo data from file."""
    apollo_path = config.get_file_path('files', 'apollo_data')
    try:
        with open(apollo_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error(f"Apollo data file not found: {apollo_path}")
        raise
    except json.JSONDecodeError:
        logger.error(f"Invalid JSON in Apollo data file: {apollo_path}")
        raise

def save_apollo_data(data: List[Dict[str, Any]]) -> None:
    """Save Apollo data to file."""
    apollo_path = config.get_file_path('files', 'apollo_data')
    try:
        with open(apollo_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Error saving Apollo data: {str(e)}")
        raise

def find_lead_by_email(apollo_data, email):
    """Find a lead in apollo_data by their email"""
    for lead in apollo_data['leads']:
        if lead.get('email') == email:
            return lead
    return None

def update_lead_interaction(email, interaction_type, status, details=None):
    """
    Update the interaction history for a lead
    
    Args:
        email (str): Lead's email address
        interaction_type (str): Type of interaction (video, email, product_fetch)
        status (str): Status of the interaction (success, failed)
        details (dict): Optional additional details about the interaction
            For video: script_version, video_id, template_id
            For email: template_name, email_id
            For product_fetch: product_id
    """
    # Load apollo data
    apollo_data = load_apollo_data()
    
    # Find the lead
    lead = find_lead_by_email(apollo_data, email)
    if not lead:
        logger.error(f"Lead with email {email} not found!")
        return False
    
    # Initialize interactions array if it doesn't exist
    if 'interactions' not in lead:
        lead['interactions'] = []
    
    # Create interaction record
    interaction = {
        'type': interaction_type,
        'status': status,
        'timestamp': datetime.now().isoformat()
    }
    
    # Add any additional details
    if details:
        interaction.update(details)
    
    # Add the interaction to history
    lead['interactions'].append(interaction)
    
    # Save updated apollo data
    save_apollo_data(apollo_data)
    return True

def get_lead_interactions(email):
    """Get all interactions for a lead"""
    # Load apollo data
    apollo_data = load_apollo_data()
    
    # Find the lead
    lead = find_lead_by_email(apollo_data, email)
    if not lead:
        logger.error(f"Lead with email {email} not found!")
        return None
    
    return lead.get('interactions', [])

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python update_lead_status.py <email> <interaction_type> <status> <details>")
        sys.exit(1)
        
    email = sys.argv[1]
    interaction_type = sys.argv[2]
    status = sys.argv[3]
    details = sys.argv[4]
    
    try:
        update_lead_interaction(email, interaction_type, status, json.loads(details))
    except Exception as e:
        logger.error(str(e))
        sys.exit(1)
