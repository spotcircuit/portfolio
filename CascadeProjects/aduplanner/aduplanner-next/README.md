# ADU Planner

A Next.js application for planning Accessory Dwelling Units (ADUs) using AI-powered property analysis.

## Features

### 1. Property Analysis
- Automatic property type detection (single-family vs townhouse)
- Buildable area identification
- Setback calculation and visualization
- Integration with Google Maps and Places API
- AI-powered satellite image analysis using GPT-4 Vision

### 2. ADU Planning Tools
- Interactive property map with drawing tools
- Real-time ADU placement validation
- Setback visualization
- Area measurements and calculations
- Zoning compliance checks

### 3. AI Features
- GPT-4 Vision analysis for property type detection
- Automated setback measurement
- Real-time placement validation
- Building code compliance checking

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Maps**: Google Maps JavaScript API, Places API
- **AI**: OpenAI GPT-4 Vision API
- **State Management**: React Context
- **Styling**: Tailwind CSS, Heroicons

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Maps API key
- OpenAI API key

### Environment Setup
Create a `.env.local` file with:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
OPENAI_API_KEY=your_openai_key
OPENAI_ORGANIZATION_ID=your_org_id
OPENAI_MODEL=gpt-40-mini
```

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Development Commands
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run linter
npm run lint
```

## Project Structure

```
aduplanner-next/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── vision/       # Vision API endpoints
│   └── page.tsx          # Main page
├── components/            # React components
│   ├── map/              # Map-related components
│   └── property/         # Property planning components
├── lib/                   # Shared utilities
│   ├── propertyAnalysis.ts  # Property analysis logic
│   └── visionAnalysis.ts    # Vision API integration
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## API Routes

### Vision Analysis
- `POST /api/vision/analyze`
  - Analyzes property images for type detection
  - Requires image URL in request body
  - Returns property analysis results

- `POST /api/vision/validate`
  - Validates ADU placement
  - Requires image URL and placement bounds
  - Returns validation results and suggestions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key
- `OPENAI_API_KEY`: OpenAI API key
- `OPENAI_ORGANIZATION_ID`: OpenAI organization ID
- `OPENAI_MODEL`: OpenAI model name (default: gpt-40-mini)

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with Next.js
- Uses Google Maps Platform
- Powered by OpenAI's GPT-4 Vision
- Inspired by the ADU-Planner RAG-a-thon 2024 project
