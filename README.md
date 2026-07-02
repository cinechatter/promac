# ProMac Construction & Remodeling Website

A modern, responsive React website for ProMac Construction & Remodeling services. Features kitchens, bathrooms, basements, electrical, plumbing, and general construction services.

## Project Structure

```
promac-website/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── assets/
│   │   ├── promaclogo.jpeg      # Company logo
│   │   ├── basement-bar.jpg     # Project photo 1
│   │   └── amphitheater.jpg     # Project photo 2
│   ├── App.jsx            # Main component
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies
└── README.md              # This file
```

## Installation & Setup

### 1. Install Dependencies

```bash
cd promac-website
npm install
```

### 2. Start Development Server

```bash
npm start
```

The site will open at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder ready for deployment.

## Customization

### Update Contact Information

Edit the contact details in `src/App.jsx`:
- Phone: `+12025550148`
- Email: `info@promacbuild.com`
- Instagram: `@promacconstruction`
- Facebook: `ProMac Construction & Remodeling`

### Update Images

Replace images in `src/assets/`:
- `promaclogo.jpeg` - Your company logo
- `basement-bar.jpg` - Basement project photo
- `amphitheater.jpg` - Amphitheater project photo

### Colors & Theme

Modify the color palette at the top of `src/App.jsx` in the `C` (colors) object:

```javascript
const C = {
  bg: "#0A0A0B",           // Dark background
  gold: "#C9A84C",         // Gold accent
  white: "#F5F4EF",        // Text color
  // ... more colors
};
```

### Services & Projects

Edit the `SERVICES` and `PROJECTS` arrays in `src/App.jsx` to update:
- Service descriptions
- Project details
- Portfolio items

## Deployment to Vercel

### 1. Create Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Push to GitHub

Create a repository on GitHub and push your code.

### 3. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

Vercel will automatically build and deploy your site.

## Features

✓ Responsive design (mobile, tablet, desktop)
✓ Smooth scroll navigation
✓ Contact form with validation
✓ Project portfolio showcase
✓ Service directory
✓ Animated elements
✓ Social media links
✓ SEO-friendly structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Technologies Used

- **React 18** - UI framework
- **CSS-in-JS** - Inline styling
- **Google Fonts** - Typography
- **Responsive Design** - Mobile-first approach

## Support

For questions or issues, contact ProMac Construction & Remodeling or customize further as needed.

---

Built with React and ❤️ for ProMac Construction & Remodeling
