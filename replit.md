# La Prime - Universo da Beleza

## Overview
La Prime is a modern beauty and aesthetics website built with React, TypeScript, and Vite. The site showcases beauty services, treatments, and contact information for a Brazilian beauty salon offering aesthetics, dentistry, and beauty services.

**Current State:** Project configured for the Replit environment. The application runs on port 5000 with proper proxy configuration.

## Recent Changes
- **2025-11-19**: Project import from GitHub
  - Configured Vite to run on port 5000 with host allowance for Replit proxy
  - Set up Frontend workflow for development
  - Configured deployment for production with autoscale
  - Installed all dependencies

## Project Architecture

### Tech Stack
- **Frontend Framework:** React ^19.2.0 (installed: 19.2.0)
- **React DOM:** react-dom ^19.2.0 (installed: 19.2.0)
- **Language:** TypeScript ~5.8.2 (installed: 5.8.3)
- **Build Tool:** Vite ^6.2.0 (installed: 6.4.1)
- **Vite Plugin:** @vitejs/plugin-react ^5.0.0 (installed: 5.1.1)
- **Styling:** Tailwind CSS (via CDN in index.html)
- **Fonts:** Google Fonts (Playfair Display, Poppins)

### Project Structure
```
/
├── components/          # React components
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── FeaturedTreatments.tsx
│   ├── FloatingWhatsApp.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Logo.tsx
│   ├── ServicesSection.tsx
│   └── TestimonialsSection.tsx
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

### Key Features
- Smooth scroll navigation between sections
- Responsive design with Tailwind CSS
- WhatsApp floating button for customer contact
- Services and treatments showcase
- Customer testimonials section
- Contact form section

### Development Configuration
- **Port:** 5000 (required for Replit webview)
- **Host:** 0.0.0.0 (required for external access)
- **Host Validation:** Disabled with `allowedHosts: true` (required for Replit proxy)
- **Environment Variables:** The vite.config.ts expects GEMINI_API_KEY and exposes it as process.env.API_KEY and process.env.GEMINI_API_KEY in the build (optional)

### Deployment Configuration
- **Type:** Autoscale (stateless web application)
- **Build Command:** `npm run build`
- **Run Command:** `npx vite preview --host 0.0.0.0 --port 5000`

## Running the Project

### Development
The Frontend workflow is pre-configured and runs automatically with:
```
npm run dev
```

### Production Build
```
npm run build
npm run preview
```

## Notes
- The project uses Tailwind CSS via CDN for styling (loaded in index.html)
- Custom brand colors are defined in the inline Tailwind configuration within index.html
- The index.html includes an import map that references React from aistudiocdn.com, but Vite bundles the npm-installed React packages during build
- No backend required - this is a static frontend application
