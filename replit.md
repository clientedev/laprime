# La Prime Saúde e Bem Estar

## Overview
La Prime Saúde e Bem Estar is a comprehensive multi-page beauty and wellness website built with React, TypeScript, Vite, and React Router. The site showcases dedicated pages for each service (Salão, Unhas, Cílios, Estética, Odontologia) with detailed treatment information, integrates complete business information from the briefing, and provides smooth SPA navigation between pages and sections.

**Current State:** Fully enriched multi-page experience with React Router navigation, all briefing data integrated, and smooth cross-page navigation implemented.

## Recent Changes
- **2025-11-19**: Multi-page transformation and enrichment
  - Installed React Router DOM and created routing structure
  - Created 5 dedicated service pages with rich content:
    - SalaoPage: Hair treatments, coloring, styling
    - UnhasPage: Manicure and pedicure services
    - CiliosPage: Eyelash extensions and design
    - EsteticaPage: Facial and body aesthetics treatments
    - OdontologiaPage: Cosmetic dentistry services
  - Updated all components with briefing information:
    - AboutSection: Business history and mission
    - ContactSection: Real contact details, business hours, Google Maps integration
    - FloatingWhatsApp: Real WhatsApp number with pre-filled message
    - ServicesSection: Clickable service cards linking to dedicated pages
  - Added TeamSection component with team information
  - Fixed React version conflict by removing import map from index.html
  - Implemented smooth SPA navigation with React Router (no page reloads)
  - Added section IDs to HomePage for hash-based navigation
  - Updated metadata in index.html with accurate business information
- **2025-11-19**: Initial project import from GitHub
  - Configured Vite to run on port 5000 with host allowance for Replit proxy
  - Set up Frontend workflow for development
  - Configured deployment for production with autoscale
  - Installed all dependencies

## Project Architecture

### Tech Stack
- **Frontend Framework:** React ^19.2.0 (installed: 19.2.0)
- **React DOM:** react-dom ^19.2.0 (installed: 19.2.0)
- **Routing:** React Router DOM ^7.1.1
- **Language:** TypeScript ~5.8.2 (installed: 5.8.3)
- **Build Tool:** Vite ^6.2.0 (installed: 6.4.1)
- **Vite Plugin:** @vitejs/plugin-react ^5.0.0 (installed: 5.1.1)
- **Styling:** Tailwind CSS (via CDN in index.html)
- **Fonts:** Google Fonts (Playfair Display, Poppins)

### Project Structure
```
/
├── components/          # Reusable React components
│   ├── AboutSection.tsx        # Business history and mission
│   ├── ContactSection.tsx      # Contact form, hours, map
│   ├── FeaturedTreatments.tsx  # Highlighted treatments
│   ├── FloatingWhatsApp.tsx    # WhatsApp floating button
│   ├── Footer.tsx              # Site footer with links
│   ├── Header.tsx              # Navigation header
│   ├── Hero.tsx                # Homepage hero section
│   ├── Logo.tsx                # La Prime logo component
│   ├── ServicesSection.tsx     # Service cards with links
│   ├── TeamSection.tsx         # Team information
│   └── TestimonialsSection.tsx # Customer testimonials
├── pages/               # Route pages
│   ├── HomePage.tsx            # Main landing page
│   ├── SalaoPage.tsx           # Hair salon services
│   ├── UnhasPage.tsx           # Nail services
│   ├── CiliosPage.tsx          # Eyelash services
│   ├── EsteticaPage.tsx        # Aesthetics services
│   └── OdontologiaPage.tsx     # Dentistry services
├── App.tsx              # Main app with routing setup
├── index.tsx            # Application entry point
├── index.html           # HTML template with metadata
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

### Key Features
- **Multi-page SPA:** React Router navigation with 6 distinct pages
- **Smooth Navigation:** Hash-based section scrolling without page reloads
- **Service Pages:** Dedicated pages for each service with detailed treatment information
- **Responsive Design:** Mobile-first design with Tailwind CSS
- **Contact Integration:**
  - WhatsApp: (11) 99215-3511
  - Email: laprime.mkt@gmail.com
  - Address: Rua Clovis da Cunha Castro nº 5
  - Hours: Tuesday-Saturday 10:00-20:00
  - Instagram: @clinica.laprime
- **Google Maps:** Embedded map in contact section
- **Team Section:** Professional team presentation
- **CTAs:** Clear call-to-action buttons for appointment booking
- **Customer Testimonials:** Social proof section

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

## Business Information
- **Business Name:** La Prime Saúde e Bem Estar
- **Phone:** (11) 99215-3511
- **Email:** laprime.mkt@gmail.com
- **Address:** Rua Clovis da Cunha Castro nº 5
- **Hours:** Tuesday-Saturday, 10:00-20:00
- **Instagram:** @clinica.laprime
- **Services:** Salão (hair), Unhas (nails), Cílios (eyelashes), Estética (aesthetics), Odontologia (dentistry)

## Technical Notes
- The project uses Tailwind CSS via CDN for styling (loaded in index.html)
- Custom brand colors are defined in the inline Tailwind configuration within index.html
- React Router handles client-side navigation without page reloads
- Hash-based navigation allows smooth scrolling from service pages back to home sections
- No backend required - this is a static frontend application
- All contact information and business data integrated from briefing document
