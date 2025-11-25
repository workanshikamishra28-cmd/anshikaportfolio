# AnshikaOS Setup Instructions

## Quick Start

Follow these steps to get the new AnshikaOS interface up and running:

### 1. Install Dependencies

The required `react-icons` package has already been installed. If you need to reinstall:

```bash
npm install react-icons
```

### 2. Seed Sanity with OS Apps Data

Navigate to the Sanity studio and run the seed script:

```bash
cd sanity-studio
npx sanity exec seed-os-apps.ts --with-user-token
```

This will create all the default apps:
- About Me
- Work
- Resume
- To-Do List
- Project folders (01-04)
- Trash

### 3. Start Development Servers

**Terminal 1 - Main App:**
```bash
npm run dev
```

**Terminal 2 - Sanity Studio (optional):**
```bash
npm run studio
```

### 4. Test the Interface

1. Open your browser to `http://localhost:5173`
2. Click the "Open AnshikaOS" button on the hero section
3. The new macOS-style interface should appear!

## What's New

### Visual Changes
- ✨ Modern macOS Big Sur/Monterey aesthetic
- 🎨 Glassmorphism effects with backdrop blur
- 🪟 Professional window management system
- 🎯 Authentic macOS traffic light buttons
- 📱 Interactive dock with hover animations
- 📝 Sticky note on desktop (To-Do list)

### Technical Improvements
- 🔌 Full Sanity CMS integration
- 🎭 React Icons for professional icon library
- 🎪 Window state management (minimize, maximize, close)
- 🎨 Custom icon colors per app
- 📐 Configurable window sizes
- 🎯 Z-index management for window stacking

### Content Management
All apps are now managed through Sanity:
- Edit app titles, icons, and colors
- Update content without code changes
- Add new apps through Sanity Studio
- Reorder apps by changing order field

## Customization

### Adding New Apps in Sanity

1. Go to Sanity Studio
2. Create new "AnshikaOS Apps" document
3. Fill in:
   - **App ID**: Unique identifier (e.g., `my-app`)
   - **Title**: Display name
   - **Icon**: React Icons name (e.g., `FaHeart`)
   - **Icon Color**: Hex color (e.g., `#ff0000`)
   - **Order**: Display position
   - **App Type**: Choose from dropdown
   - **Content**: Add text, images, or lists
   - **Default Size**: Set window dimensions

### Available Icons

Browse icons at: https://react-icons.github.io/react-icons/

Popular choices:
- Font Awesome: `FaUser`, `FaBriefcase`, `FaHeart`, `FaStar`
- Material Design: `MdWork`, `MdPerson`, `MdEmail`
- Ionicons: `IoMdPerson`, `IoMdBriefcase`

### Color Palette

Stick to the portfolio theme:
```
Primary: #78201B (Persian Plum)
Accent: #D4A574 (Gold)
Dark: #5c1a1a
Light: #F8EDEA
```

## Troubleshooting

### Icons Not Showing
- Make sure the icon name matches exactly (case-sensitive)
- Check that the icon exists in react-icons
- Verify the icon is imported in `iconMap` in AnshikaOS.tsx

### Apps Not Loading
- Check Sanity connection in `.env` or `sanity.config.ts`
- Verify seed script ran successfully
- Check browser console for errors

### Window Issues
- Clear browser cache
- Check z-index conflicts
- Verify window state management

## File Structure

```
src/
├── components/
│   ├── AnshikaOS.tsx          # Main OS component
│   └── Hero.tsx               # Updated to use AnshikaOS
├── lib/
│   └── sanity-queries.ts      # Added getOSApps query
└── types/
    └── sanity.ts              # Added OSApp type

sanity-studio/
├── schemaTypes/
│   ├── osApp.ts               # New schema
│   └── index.ts               # Updated exports
└── seed-os-apps.ts            # Seed script
```

## Next Steps

1. **Customize Content**: Edit apps in Sanity Studio
2. **Add Images**: Upload images for About Me and projects
3. **Update Resume**: Add your resume PDF URL
4. **Personalize**: Change colors, icons, and text to match your style
5. **Test**: Try all window interactions (drag, minimize, maximize)

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify Sanity connection
3. Ensure all dependencies are installed
4. Review the ANSHIKA_OS_GUIDE.md for detailed documentation

---

**Enjoy your new macOS-inspired portfolio interface! 🎉**
