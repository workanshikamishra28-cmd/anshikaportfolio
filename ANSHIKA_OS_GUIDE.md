# AnshikaOS - Modern macOS Interface Guide

## Overview

AnshikaOS is a completely redesigned, modern macOS-inspired interface for the portfolio. It features:

- **Modern macOS Aesthetic**: Clean, minimalist design with glassmorphism effects
- **Authentic macOS Icons**: Using `react-icons` library for professional icon sets
- **Window Management**: Full drag, minimize, maximize, and close functionality
- **Dock System**: Interactive dock with app indicators
- **Sanity CMS Integration**: All apps and content managed through Sanity

## Features

### 1. Menu Bar
- Apple logo and app menus
- System icons (WiFi, Battery, Search)
- Live clock
- Exit button

### 2. Desktop
- Right-aligned app icons with custom colors
- Double-click or single-click to open apps
- Clean, gradient background

### 3. Window System
- **Traffic Lights**: Red (close), Yellow (minimize), Green (maximize)
- **Draggable Windows**: Click and drag title bar to move
- **Window Stacking**: Click to bring to front (z-index management)
- **Minimize to Dock**: Windows minimize with indicator dot
- **Maximize**: Full-screen window mode

### 4. Dock
- Glassmorphism effect with backdrop blur
- Hover animations (scale + translate)
- Active app indicators (dots below icons)
- Restore minimized windows by clicking dock icon

## App Types

The system supports multiple app types:

1. **About** - Personal bio with image and text
2. **Work** - Project grid display
3. **Resume** - Resume viewer with download link
4. **To-Do** - Interactive checklist
5. **Gallery** - Image gallery
6. **Spotify** - Music integration
7. **Text** - Simple text file viewer
8. **Trash** - Fun easter egg

## Sanity CMS Setup

### Schema: `osApp`

```typescript
{
  appId: string          // Unique identifier
  title: string          // Display name
  icon: string           // React Icons name (e.g., 'FaUser')
  iconColor: string      // Hex color for icon background
  order: number          // Display order
  appType: string        // App type (about, work, resume, etc.)
  content: {
    text?: string        // Text content
    image?: image        // Image asset
    items?: string[]     // List items (for todo)
    fileUrl?: url        // External file link
  }
  defaultSize: {
    width: number
    height: number
  }
}
```

## Seeding Data

To populate the OS with default apps:

```bash
cd sanity-studio
npx sanity exec seed-os-apps.ts --with-user-token
```

## Customization

### Adding New Apps

1. Create app in Sanity Studio
2. Choose icon from React Icons (Fa*, Md*, Io*, etc.)
3. Set custom icon color
4. Define app type and content
5. Set default window size

### Icon Options

Available icon libraries:
- **Font Awesome**: `FaUser`, `FaBriefcase`, `FaFileAlt`
- **Material Design**: `MdWork`, `MdPerson`
- **Ionicons**: `IoMdPerson`, `IoMdBriefcase`

### Color Palette

Recommended colors matching the portfolio theme:
- Primary: `#78201B` (Persian Plum)
- Accent: `#D4A574` (Gold)
- Dark: `#5c1a1a`
- Light: `#F8EDEA`

## Design Inspiration

The interface is inspired by:
- macOS Big Sur / Monterey design language
- Glassmorphism and backdrop blur effects
- Modern portfolio OS concepts
- The mockups provided showing clean, professional macOS windows

## Technical Details

### Dependencies
- `react-icons` - Icon library
- `@sanity/client` - CMS integration
- Tailwind CSS - Styling

### Key Components
- `AnshikaOS.tsx` - Main OS component
- `osApp.ts` - Sanity schema
- `sanity-queries.ts` - Data fetching

### Performance
- Lazy loading of app content
- Optimized window rendering
- Smooth animations with CSS transforms
- Backdrop blur for glassmorphism

## Usage

```tsx
import AnshikaOS from './components/AnshikaOS'

<AnshikaOS 
  open={isOpen} 
  onClose={() => setIsOpen(false)} 
/>
```

## Future Enhancements

Potential additions:
- Window resize handles
- Snap-to-grid functionality
- Multiple desktop spaces
- Spotlight search
- Notification center
- Dark mode toggle
- Custom wallpapers from Sanity
- App preferences/settings

---

**Made with ❤️ for Anshika's Portfolio**
