"""Check avatar availability and status."""

import json
from typing import Dict, Any, List, Optional
from scripts.jogg_api import JoggAPIClient
from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

def load_avatars() -> Dict[str, List[Dict[str, Any]]]:
    """Load both public and custom avatars."""
    avatars = {
        'public': [],
        'custom': []
    }
    
    try:
        # Load public avatars
        public_path = config.get_file_path('files', 'jogg', 'public_avatars')
        with open(public_path, 'r', encoding='utf-8') as f:
            avatars['public'] = json.load(f)
        
        # Load custom avatars
        custom_path = config.get_file_path('files', 'jogg', 'custom_avatars')
        with open(custom_path, 'r', encoding='utf-8') as f:
            avatars['custom'] = json.load(f)
            
        return avatars
        
    except FileNotFoundError as e:
        logger.error(f"Avatar file not found: {e.filename}")
        raise
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in avatar file: {e.doc}")
        raise

def check_avatar(avatar_id: int, avatar_type: str = 'custom') -> Optional[Dict[str, Any]]:
    """
    Check if a specific avatar is available.
    
    Args:
        avatar_id: ID of the avatar to check
        avatar_type: Type of avatar ('public' or 'custom')
        
    Returns:
        Avatar info if found, None otherwise
    """
    try:
        avatars = load_avatars()
        avatar_list = avatars.get(avatar_type, [])
        
        avatar = next(
            (a for a in avatar_list if a['id'] == avatar_id),
            None
        )
        
        if avatar:
            logger.info(f"Found {avatar_type} avatar {avatar_id}")
            logger.info(f"Status: {avatar.get('status', 'unknown')}")
            logger.info(f"Name: {avatar.get('name', 'unnamed')}")
            return avatar
        else:
            logger.warning(f"{avatar_type.title()} avatar {avatar_id} not found")
            return None
            
    except Exception as e:
        logger.error(f"Error checking avatar: {str(e)}")
        raise

def check_all_avatars() -> Dict[str, List[Dict[str, Any]]]:
    """
    Check status of all avatars.
    
    Returns:
        Dictionary with lists of public and custom avatars
    """
    try:
        avatars = load_avatars()
        
        # Check public avatars
        logger.info("\nPublic Avatars:")
        for avatar in avatars['public']:
            logger.info(f"ID: {avatar['id']}")
            logger.info(f"Name: {avatar.get('name', 'unnamed')}")
            logger.info(f"Status: {avatar.get('status', 'unknown')}")
            logger.info("-" * 40)
        
        # Check custom avatars
        logger.info("\nCustom Avatars:")
        for avatar in avatars['custom']:
            logger.info(f"ID: {avatar['id']}")
            logger.info(f"Name: {avatar.get('name', 'unnamed')}")
            logger.info(f"Status: {avatar.get('status', 'unknown')}")
            logger.info("-" * 40)
            
        return avatars
        
    except Exception as e:
        logger.error(f"Error checking avatars: {str(e)}")
        raise

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        # Check specific avatar
        avatar_id = int(sys.argv[1])
        avatar_type = sys.argv[2] if len(sys.argv) > 2 else 'custom'
        try:
            check_avatar(avatar_id, avatar_type)
        except Exception as e:
            logger.error(str(e))
            sys.exit(1)
    else:
        # Check all avatars
        try:
            check_all_avatars()
        except Exception as e:
            logger.error(str(e))
            sys.exit(1)
