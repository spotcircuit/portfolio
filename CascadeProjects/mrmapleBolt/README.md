# Mr Maple Bolt Project

This repository contains the Next.js e-commerce project for Mr Maple. The project is being restructured and improved in phases.

## Current Status (Tag 1.3)
- [x] Upgraded to Next.js 14
- [x] Moved all components under src directory
- [x] Fixed layout structure and metadata exports
- [x] Removed duplicate files from root directory
- [ ] Navigation components need to be restored (TopBar and MainNavigation)

## Project Structure
```
src/
├── app/                    # Next.js app directory
│   ├── shop/              # Shop-related pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── home/             # Home page components
│   ├── layout/           # Layout components (navigation, header)
│   ├── providers/        # React context providers
│   └── ui/               # Reusable UI components
├── config/               # Configuration files
├── hooks/               # Custom React hooks
└── lib/                # Utilities and constants
```

## Next Steps
1. Restore navigation components:
   - TopBar component
   - MainNavigation component
   - Integrate with existing layout

2. Implement proper client-side navigation:
   - Category navigation
   - User navigation
   - Mobile responsiveness

3. Add proper error boundaries and loading states:
   - Suspense boundaries
   - Error handling
   - Loading skeletons

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Git Tags
- 1.3: Fixed layout and removed duplicate files
