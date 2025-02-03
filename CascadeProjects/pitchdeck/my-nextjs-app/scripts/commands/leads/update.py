"""Update lead status and interactions."""

import json
import os
import sys
from datetime import datetime
from typing import Dict, Any

# Add the project root to the Python path using Windows-style paths
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
sys.path.insert(0, project_root)

from scripts.utils.config import config
from scripts.utils.logging import setup_logging
from .grab import load_apollo_data, save_apollo_data

logger = setup_logging(__name__)

def update_lead_status(
    lead_id: str,
    status: str,
    interaction_type: str = None,
    notes: str = None
) -> None:
    """
    Update the status and add an interaction for a lead.
    
    Args:
        lead_id: ID of the lead to update
        status: New status for the lead
        interaction_type: Type of interaction (optional)
        notes: Additional notes about the interaction (optional)
    """
    try:
        # Load Apollo data
        data = load_apollo_data()
        leads = data.get('leads', [])
        
        # Find the lead
        lead = None
        for l in leads:
            if l.get('id') == lead_id:
                lead = l
                break
        
        if not lead:
            logger.error(f"Lead not found with ID: {lead_id}")
            return
        
        # Update status
        lead['status'] = status
        lead['updated_at'] = datetime.now().isoformat()
        
        # Add interaction if provided
        if interaction_type or notes:
            if 'interactions' not in lead:
                lead['interactions'] = []
                
            interaction = {
                'type': interaction_type,
                'notes': notes,
                'timestamp': datetime.now().isoformat()
            }
            lead['interactions'].append(interaction)
        
        # Save updated data
        save_apollo_data(data)
        logger.info(f"Updated lead {lead_id} status to {status}")
        
    except Exception as e:
        logger.error(f"Error updating lead status: {str(e)}")
        raise

if __name__ == "__main__":
    if len(sys.argv) < 3:
        logger.error("Please provide lead_id and status")
        print("Usage: python -m scripts.commands.leads.update <lead_id> <status> [interaction_type] [notes]")
        sys.exit(1)
        
    lead_id = sys.argv[1]
    status = sys.argv[2]
    interaction_type = sys.argv[3] if len(sys.argv) > 3 else None
    notes = sys.argv[4] if len(sys.argv) > 4 else None
    
    try:
        update_lead_status(lead_id, status, interaction_type, notes)
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        sys.exit(1)
