#!/usr/bin/env python3
"""Fetch and save all available options from the Jogg API."""

import json
from typing import Dict, Any
from scripts.jogg_api import JoggAPIClient
from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

def save_to_file(data: Dict[str, Any], filename: str) -> None:
    """Save data to a file in the jogg_options directory."""
    file_path = config.get_file_path('files', 'jogg', filename)
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        logger.info(f"Saved data to {file_path}")
    except Exception as e:
        logger.error(f"Error saving to {file_path}: {str(e)}")
        raise

def fetch_all_options() -> None:
    """Fetch all available options from the Jogg API."""
    api = JoggAPIClient()
    
    try:
        # Fetch public avatars
        logger.info("Fetching public avatars...")
        avatars = api.list_avatars()
        if avatars.get('code') == 0:
            save_to_file(avatars['data'], 'public_avatars.json')
        
        # Fetch custom avatars
        logger.info("Fetching custom avatars...")
        custom_avatars = api.list_custom_avatars()
        if custom_avatars.get('code') == 0:
            save_to_file(custom_avatars['data'], 'custom_avatars.json')
        
        # Fetch voices
        logger.info("Fetching voices...")
        voices = api.list_voices()
        if voices.get('code') == 0:
            save_to_file(voices['data'], 'voices.json')
        
        # Fetch custom voices
        logger.info("Fetching custom voices...")
        custom_voices = api.list_custom_voices()
        if custom_voices.get('code') == 0:
            save_to_file(custom_voices['data'], 'custom_voices.json')
        
        # Fetch visual styles for different aspect ratios
        logger.info("Fetching visual styles...")
        for ratio in [0, 1]:  # 0: portrait, 1: landscape
            styles = api.list_visual_styles(ratio)
            if styles.get('code') == 0:
                save_to_file(styles['data'], f'visual_styles_ratio_{ratio}.json')
        
        # Fetch music options
        logger.info("Fetching music options...")
        music = api.list_music()
        if music.get('code') == 0:
            save_to_file(music['data'], 'music.json')
        
        # Fetch templates
        logger.info("Fetching templates...")
        templates = api.list_templates()
        if templates.get('code') == 0:
            save_to_file(templates['data'], 'templates.json')
        
        # Fetch custom templates
        logger.info("Fetching custom templates...")
        custom_templates = api.list_custom_templates()
        if custom_templates.get('code') == 0:
            save_to_file(custom_templates['data'], 'custom_templates.json')
        
        # Fetch webhook events
        logger.info("Fetching webhook events...")
        events = api.list_webhook_events()
        if events.get('code') == 0:
            save_to_file(events['data'], 'webhook_events.json')
            
        logger.info("Successfully fetched all options!")
        
    except Exception as e:
        logger.error(f"Error fetching options: {str(e)}")
        raise

if __name__ == "__main__":
    try:
        fetch_all_options()
    except Exception as e:
        logger.error(str(e))
        exit(1)
