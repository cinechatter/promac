# ProMac Website - Quick Start Guide

## 📦 What You Have

A complete, production-ready React website for ProMac Construction & Remodeling with:
- ✅ All your images (logo, basement bar, amphitheater)
- ✅ Full website components (nav, hero, services, projects, contact)
- ✅ Responsive mobile design
- ✅ Contact form
- ✅ Social media links
- ✅ Ready to deploy to Vercel

## 🚀 Get Started in 3 Steps

### Step 1: Extract & Open in VS Code

1. Download the `promac-website` folder
2. Open it in VS Code: `File → Open Folder → select promac-website`

### Step 2: Install Dependencies & Start

Open the terminal in VS Code (Ctrl+` or View → Terminal) and run:

```bash
npm install
npm start
```

This will:
- Install all required packages
- Start a development server on `http://localhost:3000`
- Auto-reload as you make changes

### Step 3: Customize (Optional)

Edit these files to customize:

**Contact Info** - `src/App.jsx`
- Find the contact links section (search for "phone")
- Update: phone, email, Instagram handle, Facebook page

**Services** - `src/App.jsx`
- Find the `SERVICES` array
- Edit descriptions, add/remove services

**Projects** - `src/App.jsx`
- Find the `PROJECTS` array
- Update project descriptions and details

**Colors** - `src/App.jsx`
- Find the `const C = { ... }` object at the top
- Modify colors (gold, blue, backgrounds, etc.)

## 📱 File Structure

```
promac-website/
├── src/
│   ├── assets/          ← Your images live here
│   ├── App.jsx          ← Main website component
│   ├── index.js         ← Entry point
│   └── index.css        ← Global styles
├── package.json         ← Dependencies list
└── README.md           ← Full documentation
```

## 🌐 Deploy to Vercel (FREE)

Once you're happy with your site:

### Option A: Using Git (Recommended)

1. **Create GitHub account** (if you don't have one): github.com
2. **Create new repository** with the same name: "promac-website"
3. **Push your code** from VS Code:
   ```bash
   git init
   git add .
   git commit -m "Initial ProMac website"
   git remote add origin https://github.com/YOUR_USERNAME/promac-website.git
   git push -u origin main
   ```
4. **Go to Vercel**: vercel.com → Sign in with GitHub
5. **Import Project** → Select your repo → Deploy

Your site will be live at something like: `promac-website.vercel.app`

### Option B: Direct Upload

1. Go to **vercel.com**
2. Click **Upload → Drop folder → Select promac-website**
3. Deploy in seconds

## ✏️ Common Edits

### Change Company Name
- Search for "ProMac" in `src/App.jsx` and replace globally

### Add New Project
In `src/App.jsx`, find `PROJECTS` array and add:
```javascript
{
  id: 3,
  title: "Your Project Name",
  category: "Kitchen Remodeling",
  location: "United States",
  desc: "Project description...",
  img: barImage,  // or amphiImage
  tags: ["Tag1", "Tag2"],
}
```

### Update Logo
1. Replace `src/assets/promaclogo.jpeg` with your new logo
2. Must be a .jpeg or .jpg file

## 🛠️ Troubleshooting

**Port 3000 already in use?**
```bash
npm start -- --port 3001
```

**Images not showing?**
- Make sure files are in `src/assets/` folder
- Check filenames match exactly in imports

**Form not submitting?**
- Form shows success message but doesn't send emails by default
- To enable email: connect to EmailJS or similar service

## 📊 Browser Testing

Test on different devices:
- Desktop: Chrome, Firefox, Safari, Edge
- Mobile: Open `http://localhost:3000` on phone (same WiFi)
- Tablet: Test in Chrome DevTools responsive mode

## 📞 Next Steps

1. ✅ Get the site running locally
2. ✅ Customize contact info & images
3. ✅ Test on mobile
4. ✅ Deploy to Vercel
5. ✅ Update social media with your new website URL

## 🎨 Design Notes

- Dark theme with gold/blue accents
- Responsive breakpoints: mobile, tablet, desktop
- Smooth scrolling navigation
- Animated hero section
- Professional footer with social links

## 📚 Learn More

- React: [react.dev](https://react.dev)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- VS Code Tips: [code.visualstudio.com/docs](https://code.visualstudio.com/docs)

---

**Questions?** Check README.md for more details or customize the code directly!
