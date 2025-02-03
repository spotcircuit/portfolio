from jogg_api import JoggAPIClient
import json
from pathlib import Path
import logging
import os
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def select_from_options(prompt, options, allow_skip=False):
    print(f"\n{prompt}")
    for i, (key, desc) in enumerate(options, 1):
        print(f"{i}. {key} - {desc}")
    
    while True:
        try:
            if allow_skip:
                choice = input("\nEnter number (or press Enter to skip): ").strip()
                if not choice:
                    return None
            else:
                choice = input("\nEnter number: ").strip()
            
            idx = int(choice) - 1
            if 0 <= idx < len(options):
                selected = options[idx][0]
                print(f"Selected: {selected}")
                return selected
            print("Invalid selection. Please try again.")
        except ValueError:
            print("Please enter a valid number")

def create_video_config():
    # Load environment variables
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        print("Error: JOGG_API_KEY not found in environment variables")
        exit(1)

    client = JoggAPIClient(api_key)
    config = {}

    # 1. Aspect Ratio
    aspect_ratios = [
        (0, "Portrait [9:16]"),
        (1, "Landscape [16:9]"),
        (2, "Square [1:1]")
    ]
    config['aspect_ratio'] = select_from_options(
        "Select aspect ratio:",
        aspect_ratios
    )

    # 2. Avatar Type
    avatar_types = [
        (0, "Public avatars"),
        (1, "Custom avatars")
    ]
    config['avatar_type'] = select_from_options(
        "Select avatar type:",
        avatar_types
    )

    # 3. Avatar ID
    if config['avatar_type'] == 1:
        # For custom avatar (Brian Pyatt)
        config['avatar_id'] = 113443
        print("\nUsing Brian Pyatt avatar (ID: 113443)")
    else:
        # Get public avatars
        try:
            response = client.avatars.list_avatars()
            if response and response.get('code') == 0:
                avatars = [(a['id'], a['name']) for a in response['data'].get('avatars', [])]
                config['avatar_id'] = select_from_options(
                    "Select avatar:",
                    avatars
                )
        except Exception as e:
            logger.error(f"Error getting avatars: {str(e)}")
            return None

    # 4. Language
    languages = [
        ("english", "English"), ("spanish", "Spanish"), ("french", "French"),
        ("german", "German"), ("italian", "Italian"), ("japanese", "Japanese"),
        ("korean", "Korean"), ("chinese", "Simplified Chinese"),
        ("traditional-chinese", "Traditional Chinese")
        # Add more languages as needed
    ]
    config['language'] = select_from_options(
        "Select language:",
        languages
    )

    # 5. Script Style
    script_styles = [
        ("Don't Worry", "Casual and reassuring tone"),
        ("Storytime", "Narrative and engaging storytelling approach"),
        ("Discovery", "Exploratory and revealing style"),
        ("Data", "Fact-based and analytical presentation"),
        ("Top 3 reasons", "List-based persuasive format"),
        ("Light marketing", "Soft-sell marketing approach")
    ]
    config['script_style'] = select_from_options(
        "Select script style:",
        script_styles
    )

    # 6. Template Type
    template_types = [
        ("public", "Template from template library"),
        ("custom", "Template from my templates")
    ]
    config['template_type'] = select_from_options(
        "Select template type:",
        template_types
    )

    # 7. Video Length
    video_lengths = [
        ("15", "15 seconds"),
        ("30", "30 seconds"),
        ("60", "60 seconds")
    ]
    config['video_length'] = select_from_options(
        "Select video length:",
        video_lengths
    )

    # 8. Caption
    caption_options = [
        (True, "Show subtitles"),
        (False, "Hide subtitles")
    ]
    config['caption'] = select_from_options(
        "Select caption option:",
        caption_options
    )

    # 9. Voice ID (using Brian's voice)
    config['voice_id'] = "tb_713b5f8c78e84c3ebb812651db6d2a6d"
    print("\nUsing Brian Pyatt's voice")

    # 10. Template ID
    try:
        response = client.templates.list_templates()
        if response and response.get('code') == 0:
            templates = [(t['id'], t['name']) for t in response['data'].get('templates', [])]
            config['template_id'] = select_from_options(
                "Select template:",
                templates,
                allow_skip=True
            )
    except Exception as e:
        logger.error(f"Error getting templates: {str(e)}")

    # 11. Visual Style
    try:
        response = client.visual_styles.list_styles()
        if response and response.get('code') == 0:
            styles = [(s['name'], s.get('description', 'No description')) 
                     for s in response['data'].get('styles', [])]
            config['visual_style'] = select_from_options(
                "Select visual style:",
                styles,
                allow_skip=True
            )
    except Exception as e:
        logger.error(f"Error getting visual styles: {str(e)}")

    # 12. Music ID
    try:
        response = client.music.list_music()
        if response and response.get('code') == 0:
            music_list = [(m['id'], m['name']) for m in response['data'].get('music', [])]
            config['music_id'] = select_from_options(
                "Select background music:",
                music_list,
                allow_skip=True
            )
    except Exception as e:
        logger.error(f"Error getting music list: {str(e)}")

    # 13. Override Script
    override = input("\nWould you like to provide a custom script? (y/N): ").lower()
    if override == 'y':
        config['override_script'] = input("Enter your custom script:\n")
    else:
        config['override_script'] = None

    # Save configuration
    config_file = Path('video_config.json')
    with open(config_file, 'w') as f:
        json.dump(config, f, indent=2)
    print(f"\nConfiguration saved to {config_file}")
    return config

if __name__ == "__main__":
    config = create_video_config()
    if config:
        print("\nFinal Configuration:")
        print(json.dumps(config, indent=2))
