# SpotCircuit Video Generation

This project uses the Jogg AI API to generate personalized sales videos using AI avatars and custom voices.

## Project Structure

```
my-nextjs-app/
├── config/                    # Configuration files
│   ├── api/                  # API-related configs
│   │   └── jogg_options/    # Jogg API options
│   │       ├── avatars.json
│   │       ├── voices.json
│   │       └── ...
│   ├── video/               # Video generation configs
│   │   └── video_config.json
│   ├── base_config.json     # Base configuration
│   ├── development.json     # Development overrides
│   └── lead_config.json     # Lead processing config
│
├── data/                     # Data storage
│   ├── docs/                # Documentation
│   │   └── jogg_docs/      # Jogg API documentation
│   ├── leads/              # Lead management data
│   │   ├── apollo_data.json
│   │   └── APOLLOCLEANSHOPIFYOWNERS.csv
│   ├── output/            # Generated content
│   │   └── videos/       # Generated videos
│   ├── responses/        # API response logs
│   └── logs/            # Application logs
│
├── scripts/              # Python processing scripts
│   ├── commands/        # Command-line interface
│   │   ├── avatars/    # Avatar management
│   │   │   ├── capture.py
│   │   │   ├── check.py
│   │   │   └── list.py
│   │   ├── leads/     # Lead processing
│   │   │   ├── grab.py
│   │   │   └── update.py
│   │   └── video/    # Video generation
│   │       ├── generate.py
│   │       ├── status.py
│   │       └── download.py
│   ├── jogg_api/     # Jogg API client
│   │   ├── client.py
│   │   ├── avatars.py
│   │   └── voices.py
│   └── utils/       # Shared utilities
│       ├── config.py
│       └── logging.py
│
├── pages/          # Next.js pages
│   └── api/       # API routes
│       ├── leads/
│       │   ├── grab.js
│       │   └── update.js
│       └── video/
│           ├── generate.js
│           └── status.js
│
├── lib/           # Shared JavaScript utilities
├── .env.local    # Environment variables
├── package.json  # Node.js dependencies
└── README.md    # Project documentation
```

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env.local` with your Jogg API key:
```
JOGG_API_KEY=your_api_key_here
```

## Usage

### Lead Processing

1. Get next lead and update product ID:
```bash
python get_product_id.py
```

2. Generate video for current lead:
```bash
python generate_video.py
```

### Video Generation Process

1. Lead data is loaded from `data/leads/lead.json`
2. Product ID is fetched from Jogg API using company website
3. Video configuration is loaded from `config/video/video_config.json`
4. Video is generated using:
   - Custom avatar (ID: 114934)
   - Brian's voice (ID: tb_713b5f8c78e84c3ebb812651db6d2a6d)
   - Portrait aspect ratio (9:16)
   - 30-second duration
   - Personalized script with lead's name and company

## Configuration

### Key Config Files

1. `base_config.json`: Core configuration and file paths
2. `video/video_config.json`: Video generation parameters
3. `avatars.json`: Avatar settings and IDs
4. `lead_config.json`: Lead processing settings

### Environment Variables

- `JOGG_API_KEY`: Your Jogg API authentication key
- `APP_ENV`: Environment (development/production)

## Development Status

### Completed
- [x] Basic project structure
- [x] Jogg API integration
- [x] Lead processing workflow
- [x] Video generation with custom avatar
- [x] Product ID fetching
- [x] Configuration management

### In Progress
- [ ] Script template system
- [ ] Video status monitoring
- [ ] Lead status tracking
- [ ] Error handling improvements

### To Do
- [ ] Add script templates
- [ ] Implement video download
- [ ] Add batch processing
- [ ] Improve logging
- [ ] Add tests

## Notes

1. All paths use Windows-style backslashes
2. File operations use UTF-8 encoding
3. Config paths accessed via `config.get_file_path()`
4. Directory paths accessed via `config.get_path()`

## Dependencies

Required Python packages:
- requests
- python-dotenv
- logging
- json

## Contributing

1. Use Windows-compatible paths
2. Follow existing code structure
3. Update configuration in `base_config.json`
4. Test on Windows environment

## License

Proprietary - All rights reserved
