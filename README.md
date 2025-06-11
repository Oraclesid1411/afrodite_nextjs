HEAD
# afrodite_nextjs
# Elite Models & Contributors Management Platform

A modern, responsive Next.js application for managing models, photographers, stylists, and other creative professionals.

## Features

### 🎭 Models Management
- **Mannequins**: Fashion and commercial models
- **Hôtesses d'Accueil**: Event hostesses and reception staff
- **Vlogueuses**: Content creators and influencers

### 🎨 Contributors Network
- **Photographers**: Portrait, fashion, and event specialists
- **Infographes**: Graphic designers and visual creators
- **Coiffeurs**: Hair stylists and makeup artists
- **Stylistes**: Fashion stylists and image consultants

### ✨ Key Features
- Responsive design with mobile-first approach
- Advanced search and filtering capabilities
- Professional profile management
- Rating and review system
- Multi-language support
- Modern UI with smooth animations
- SEO optimized

## Tech Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: JavaScript (JSX)

## Project Structure

```
├── app/
│   ├── layout.jsx                 # Root layout
│   ├── page.jsx                   # Home page
│   ├── models/
│   │   └── page.jsx              # Models listing
│   └── contributors/
│       ├── page.jsx              # Contributors overview
│       ├── photographers/
│       │   └── page.jsx          # Photographers listing
│       └── stylistes/
│           └── page.jsx          # Stylists listing
├── components/
│   ├── Navigation.jsx            # Main navigation
│   ├── Footer.jsx               # Site footer
│   └── ui/                      # shadcn/ui components
├── public/
│   └── assets/
│       ├── images/              # Image assets
│       ├── css/                 # Custom CSS files
│       └── js/                  # Utility JavaScript
└── lib/
    └── utils.ts                 # Utility functions
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Assets Organization

### Images (`public/assets/images/`)
Place your custom images here:
- Logo files
- Hero images
- Profile placeholders
- Background images

### CSS (`public/assets/css/`)
- `custom.css` - Additional custom styles
- Component-specific stylesheets

### JavaScript (`public/assets/js/`)
- `utils.js` - Utility functions
- Third-party scripts
- Custom JavaScript modules

## Customization

### Adding New Categories
1. Update the data arrays in respective page components
2. Add new route files in the `app/` directory
3. Update navigation in `components/Navigation.jsx`

### Styling
- Modify Tailwind configuration in `tailwind.config.ts`
- Add custom CSS in `public/assets/css/custom.css`
- Update color schemes in `app/globals.css`

### Content Management
- Profile data is currently stored in component files
- Ready for integration with headless CMS or database
- API routes can be added in `app/api/` directory

## Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Performance Features

- Image optimization with Next.js Image component
- Lazy loading for better performance
- Optimized bundle size
- SEO-friendly structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
e172672 (first commit)
