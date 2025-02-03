from jogg_api import JoggAPIClient
import json
import logging
from pathlib import Path
import time
import os
from dotenv import load_dotenv

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def save_to_file(data, filename):
    """Save data to a JSON file in a pretty format"""
    output_dir = Path("jogg_options")
    output_dir.mkdir(exist_ok=True)
    
    filepath = output_dir / filename
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    logger.info(f"Saved data to {filepath}")

def create_markdown(data):
    """Create markdown documentation from all the fetched data"""
    md = ["# Jogg API Video Generation Options\n"]
    
    # Basic Parameters
    md.append("""## Basic Parameters

### Aspect Ratio
- 0: [9:16] (Portrait/Mobile)
- 1: [16:9] (Landscape)
- 2: [1:1] (Square)

### Video Length
- 15 seconds
- 30 seconds
- 60 seconds

### Language
Default: english
""")

    # Avatars
    md.append("## Avatars\n")
    
    # Public Avatars
    md.append("### Public Avatars (Jogg Library)\n")
    if 'public_avatars' in data and 'avatars' in data['public_avatars']:
        for avatar in data['public_avatars']['avatars']:
            md.append(f"- {avatar['name']} (ID: {avatar.get('avatar_id', 'N/A')})")
            if 'description' in avatar:
                md.append(f"  - Description: {avatar['description']}")
            md.append("")
    
    # Custom Avatars
    md.append("\n### Custom Avatars\n")
    if 'custom_avatars' in data and 'avatars' in data['custom_avatars']:
        for avatar in data['custom_avatars']['avatars']:
            md.append(f"- {avatar['name']} (ID: {avatar.get('avatar_id', 'N/A')})")
            if 'description' in avatar:
                md.append(f"  - Description: {avatar['description']}")
            md.append("")

    # Voices
    md.append("\n## Voices\n")
    
    # Public Voices
    md.append("### Public Voices (Jogg Library)\n")
    if 'voices' in data and 'voices' in data['voices']:
        for voice in data['voices']['voices']:
            md.append(f"- {voice['name']}")
            if 'voice_id' in voice:
                md.append(f"  - ID: {voice['voice_id']}")
            if 'description' in voice:
                md.append(f"  - Description: {voice['description']}")
            md.append("")
    
    # Custom Voices
    md.append("\n### Custom Voices\n")
    if 'custom_voices' in data and 'voices' in data['custom_voices']:
        for voice in data['custom_voices']['voices']:
            md.append(f"- {voice['name']}")
            if 'voice_id' in voice:
                md.append(f"  - ID: {voice['voice_id']}")
            if 'description' in voice:
                md.append(f"  - Description: {voice['description']}")
            md.append("")

    # Visual Styles
    md.append("\n## Visual Styles\n")
    for ratio in [-1, 0, 1, 2]:
        ratio_name = {-1: "All", 0: "Portrait [9:16]", 1: "Landscape [16:9]", 2: "Square [1:1]"}[ratio]
        md.append(f"\n### {ratio_name}\n")
        key = f'visual_styles_ratio_{ratio}'
        if key in data and 'styles' in data[key]:
            for style in data[key]['styles']:
                md.append(f"- {style['name']}")
                if 'description' in style:
                    md.append(f"  - Description: {style['description']}")
                md.append("")

    # Music
    md.append("\n## Music\n")
    if 'music' in data and 'music' in data['music']:
        for music in data['music']['music']:
            md.append(f"- {music['name']} (ID: {music.get('id', 'N/A')})")
            if 'description' in music:
                md.append(f"  - Description: {music['description']}")
            md.append("")

    # Templates
    md.append("\n## Templates\n")
    
    # Public Templates
    md.append("### Public Templates (Jogg Library)\n")
    if 'templates' in data and 'templates' in data['templates']:
        for template in data['templates']['templates']:
            md.append(f"- {template['name']} (ID: {template.get('id', 'N/A')})")
            if 'description' in template:
                md.append(f"  - Description: {template['description']}")
            md.append("")
    
    # Custom Templates
    md.append("\n### Custom Templates\n")
    if 'custom_templates' in data and 'templates' in data['custom_templates']:
        for template in data['custom_templates']['templates']:
            md.append(f"- {template['name']} (ID: {template.get('id', 'N/A')})")
            if 'description' in template:
                md.append(f"  - Description: {template['description']}")
            md.append("")

    # Webhook Events
    md.append("\n## Webhook Events\n")
    if 'webhook_events' in data and 'events' in data['webhook_events']:
        for event in data['webhook_events']['events']:
            md.append(f"- {event}")

    return "\n".join(md)

def fetch_all_options():
    # Load environment variables
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))
    api_key = os.getenv('JOGG_API_KEY')
    if not api_key:
        logger.error("Error: JOGG_API_KEY not found in environment variables")
        exit(1)

    client = JoggAPIClient(api_key)
    all_data = {}
    
    try:
        # Fetch public avatars
        logger.info("Fetching public avatars...")
        avatars = client.avatars.list_avatars()
        if avatars and avatars.get('code') == 0:
            all_data['public_avatars'] = avatars['data']
            save_to_file(avatars['data'], 'public_avatars.json')
        
        time.sleep(1)  # Add small delay between requests
        
        # Fetch custom avatars
        logger.info("Fetching custom avatars...")
        custom_avatars = client.avatars.list_custom_avatars()
        if custom_avatars and custom_avatars.get('code') == 0:
            all_data['custom_avatars'] = custom_avatars['data']
            save_to_file(custom_avatars['data'], 'custom_avatars.json')
        
        time.sleep(1)
        
        # Fetch voices
        logger.info("Fetching voices...")
        voices = client.voices.list_voices()
        if voices and voices.get('code') == 0:
            all_data['voices'] = voices['data']
            save_to_file(voices['data'], 'voices.json')
        
        time.sleep(1)
        
        # Fetch custom voices
        logger.info("Fetching custom voices...")
        custom_voices = client.voices.list_custom_voices()
        if custom_voices and custom_voices.get('code') == 0:
            all_data['custom_voices'] = custom_voices['data']
            save_to_file(custom_voices['data'], 'custom_voices.json')
        
        time.sleep(1)
        
        # Fetch visual styles for different aspect ratios
        logger.info("Fetching visual styles...")
        for ratio in [-1, 0, 1, 2]:  # -1: all, 0: 9:16, 1: 16:9, 2: 1:1
            styles = client.visual_styles.list_styles(aspect_ratio=ratio)
            if styles and styles.get('code') == 0:
                all_data[f'visual_styles_ratio_{ratio}'] = styles['data']
                save_to_file(styles['data'], f'visual_styles_ratio_{ratio}.json')
            time.sleep(1)
        
        # Fetch music options
        logger.info("Fetching music options...")
        music = client.music.list_music()
        if music and music.get('code') == 0:
            all_data['music'] = music['data']
            save_to_file(music['data'], 'music.json')
        
        time.sleep(1)
        
        # Fetch templates
        logger.info("Fetching templates...")
        templates = client.templates.list_templates()
        if templates and templates.get('code') == 0:
            all_data['templates'] = templates['data']
            save_to_file(templates['data'], 'templates.json')
        
        time.sleep(1)
        
        # Fetch custom templates
        logger.info("Fetching custom templates...")
        custom_templates = client.templates.list_custom_templates()
        if custom_templates and custom_templates.get('code') == 0:
            all_data['custom_templates'] = custom_templates['data']
            save_to_file(custom_templates['data'], 'custom_templates.json')
        
        time.sleep(1)
        
        # Fetch webhook events
        logger.info("Fetching webhook events...")
        events = client.webhooks.list_available_events()
        if events and events.get('code') == 0:
            all_data['webhook_events'] = events['data']
            save_to_file(events['data'], 'webhook_events.json')
        
        # Generate markdown documentation
        logger.info("Generating markdown documentation...")
        markdown = create_markdown(all_data)
        
        # Save markdown
        with open('jogg_options/README.md', 'w', encoding='utf-8') as f:
            f.write(markdown)
        logger.info("Documentation saved to jogg_options/README.md")
            
    except Exception as e:
        logger.error(f"Error fetching options: {str(e)}")

if __name__ == "__main__":
    fetch_all_options()
