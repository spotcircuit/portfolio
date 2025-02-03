"""Create video generation configuration."""

import json
from typing import Dict, Any, Optional
from scripts.utils.config import config
from scripts.utils.logging import setup_logging

logger = setup_logging(__name__)

def create_config(
    product_id: str,
    avatar_id: int,
    avatar_type: str = 'custom',
    language: str = 'en',
    script_style: str = 'professional',
    video_length: str = 'short',
    caption: bool = True,
    override_script: Optional[str] = None,
    voice_id: Optional[str] = None,
    visual_style: Optional[str] = None,
    template_id: Optional[int] = None,
    music_id: Optional[int] = None,
    aspect_ratio: int = 0  # 0=Portrait, 1=Landscape, 2=Square
) -> Dict[str, Any]:
    """
    Create a video generation configuration.
    
    Args:
        product_id: Product ID to generate video for
        avatar_id: Avatar ID to use
        avatar_type: Type of avatar ('public' or 'custom')
        language: Language code
        script_style: Style of script
        video_length: Length of video
        caption: Whether to include captions
        override_script: Optional script override
        voice_id: Optional voice ID
        visual_style: Optional visual style
        template_id: Optional template ID
        music_id: Optional music ID
        aspect_ratio: Aspect ratio (0=Portrait, 1=Landscape, 2=Square)
        
    Returns:
        Video configuration dictionary
    """
    try:
        # Create config
        video_config = {
            "product_id": product_id,
            "avatar_id": avatar_id,
            "avatar_type": 1 if avatar_type == 'custom' else 0,
            "language": language,
            "script_style": script_style,
            "video_length": video_length,
            "caption": caption,
            "aspect_ratio": aspect_ratio
        }
        
        # Add optional fields
        if override_script:
            video_config["override_script"] = override_script
        if voice_id:
            video_config["voice_id"] = voice_id
        if visual_style:
            video_config["visual_style"] = visual_style
        if template_id:
            video_config["template_id"] = template_id
        if music_id:
            video_config["music_id"] = music_id
            
        # Save config
        config_path = config.get_file_path('files', 'video_config')
        with open(config_path, 'w', encoding='utf-8') as f:
            json.dump(video_config, f, indent=2)
        logger.info(f"Saved video config to {config_path}")
        
        return video_config
        
    except Exception as e:
        logger.error(f"Error creating video config: {str(e)}")
        raise

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 3:
        logger.error("Please provide product_id and avatar_id")
        sys.exit(1)
        
    try:
        create_config(
            product_id=sys.argv[1],
            avatar_id=int(sys.argv[2]),
            **dict(arg.split('=') for arg in sys.argv[3:])
        )
    except Exception as e:
        logger.error(str(e))
        sys.exit(1)
