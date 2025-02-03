# Jogg API Video Generation Options

## Required Parameters

### Product ID
- Format: String
- Example: "NTIzMzc0NjI5"
- Description: The ID of the product to generate video for

### Aspect Ratio
- Values:
  - 0: [9:16] (Portrait/Mobile)
  - 1: [16:9] (Landscape)
  - 2: [1:1] (Square)

### Video Length
- Values: "15", "30", "60"
- Description: Length of video in seconds

### Language
- Default: "english"
- Description: Language for the video narration

## Avatars

### Your Custom Avatars
- Brian Pyatt (ID: 113443)
  - Status: Active
  - Cover URL: https://res.jogg.ai/jogg/res/person/2025-01-30/873075b2-07b0-46e6-b7d0-8aaa427faa4b.jpg

### Jogg Library Avatars
#### Christmas Collection
- Emily's Christmas Morning (ID: 372)
- Jamal's Merry Moments (ID: 376)
- Sofia's Christmas Magic (ID: 367)
- Zoue's Christmas Magic (ID: 369)

#### Professional Collection
- Hazel (ID: 425)
- Victoria (ID: 424)
- Evelyn (ID: 422)
- Richard (ID: 421)
- Fitness Coach Edward (ID: 420)
- Dentist Kevin (ID: 419)
- Andrew-Agent (ID: 413)
- Timothy Salesperson (ID: 412)

#### Office & Kitchen Settings
- Stella - Kitchen (ID: 410)
- Audrey Office at night (ID: 405)
- Grace in the kitchen (ID: 397)
- Benjamin Tech Blogger (ID: 398)
- Mr. Williams (ID: 406)
- Jasmine office (ID: 404)

#### Tech & Digital
- Kenji's Tech Vibe (ID: 355)
- Ethan's Tech Haven (ID: 351)
- Jun's Tech Adventure (ID: 357)
- Alex's Digital Domain (ID: 360)
- Ze's Tech Haven (ID: 353)

#### Lifestyle & Fashion
- Nia's Fashion Fitting (ID: 328)
- Malik's Shoe Showcase (ID: 327)
- Emily's Shoe Showcase (ID: 326)
- Col's Denim Flair (ID: 346)

#### Fitness & Sports
- Jordan Lifts (ID: 276)
- Anna Basketball (ID: 127)
- Anna GYM (ID: 113)
- Paulo Basketball (ID: 115)
- Paulo GYM Phone (ID: 117)

#### Car & Outdoor
- Nick In Car (ID: 101)
- Nick Outdoor Creekside (ID: 105)
- Poly In Tesla (ID: 100)
- Poly Outdoor Forest (ID: 98)

#### Living Spaces
- Charles Bright Living Room (ID: 51)
- Maria Plant Sofa (ID: 41)
- Pablo Living Room (ID: 63)
- Claire Living Room (ID: 239)

### Avatar Type
- 0: Jogg avatar (public)
- 1: Custom avatar

## Voice Options
- en-US-ChristopherNeural: Male, Professional
- Other voices available through /voices endpoint

## Style Options

### Script Styles
- "Storytime"
- Other styles available through /visual_styles endpoint

### Visual Styles
- "Simple Product Switch"
- Other styles available through /visual_styles endpoint

## Music Options
- Music ID: 13 (Example)
- Full list available through /musics endpoint

## Template Options
- Template ID: 123 (Example)
- Template Type: "public" or "custom"
- Full list available through /templates endpoint

## Additional Options

### Caption
- Type: Boolean
- Description: Whether to show captions in the video
- Default: true

### Override Script
- Type: String
- Description: Custom script to override the generated one
- Optional

## Example Configuration
```json
{
    "product_id": "NTIzMzc0NjI5",
    "aspect_ratio": 0,
    "video_length": "15",
    "language": "english",
    "avatar_id": 398,  // Benjamin Tech Blogger
    "avatar_type": 0,
    "voice_id": "en-US-ChristopherNeural",
    "music_id": 13,
    "script_style": "Storytime",
    "visual_style": "Simple Product Switch",
    "template_id": 123,
    "template_type": "public",
    "caption": true,
    "override_script": ""
}
```

## Webhook Events
Available webhook events for status updates:
- generated_video_success
- generated_video_failed
