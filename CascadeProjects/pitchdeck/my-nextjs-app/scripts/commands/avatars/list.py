"""List available avatars."""

from typing import Dict, Any, List, Optional
from scripts.utils.config import config
from scripts.utils.logging import setup_logging
from .check import load_avatars

logger = setup_logging(__name__)

def list_avatars(
    avatar_type: Optional[str] = None,
    status: Optional[str] = None
) -> Dict[str, List[Dict[str, Any]]]:
    """
    List avatars with optional filtering.
    
    Args:
        avatar_type: Optional type filter ('public' or 'custom')
        status: Optional status filter
        
    Returns:
        Dictionary containing filtered avatars
    """
    try:
        avatars = load_avatars()
        
        if avatar_type:
            # Filter by type
            if avatar_type not in avatars:
                raise ValueError(f"Invalid avatar type: {avatar_type}")
            filtered = {avatar_type: avatars[avatar_type]}
        else:
            filtered = avatars
            
        if status:
            # Filter by status
            for type_key in filtered:
                filtered[type_key] = [
                    a for a in filtered[type_key]
                    if a.get('status') == status
                ]
        
        # Print results
        for type_key, avatar_list in filtered.items():
            logger.info(f"\n{type_key.title()} Avatars:")
            if not avatar_list:
                logger.info("No avatars found")
                continue
                
            for avatar in avatar_list:
                logger.info(f"ID: {avatar['id']}")
                logger.info(f"Name: {avatar.get('name', 'unnamed')}")
                logger.info(f"Status: {avatar.get('status', 'unknown')}")
                logger.info("-" * 40)
                
        return filtered
        
    except Exception as e:
        logger.error(f"Error listing avatars: {str(e)}")
        raise

if __name__ == "__main__":
    import sys
    try:
        # Get optional filters from command line
        avatar_type = sys.argv[1] if len(sys.argv) > 1 else None
        status = sys.argv[2] if len(sys.argv) > 2 else None
        
        list_avatars(avatar_type, status)
    except Exception as e:
        logger.error(str(e))
        sys.exit(1)
