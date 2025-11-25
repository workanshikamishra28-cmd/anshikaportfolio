# Complete Sanity CMS Setup Guide

## ✅ Current Status

Your portfolio is already configured to work with Sanity CMS!

**Sanity Project Details:**
- Project ID: `7yt3l4pv`
- Dataset: `production`
- API Version: `2024-01-01`
- Access: Public read (no authentication required)

## 🚀 Quick Start

### 1. Access Sanity Studio

Your Sanity Studio is located in the `sanity-studio` folder. To run it locally:

```bash
cd sanity-studio
npm install
npm run dev
```

The studio will open at: `http://localhost:3333`

### 2. Deploy Sanity Studio (Optional)

To deploy your Sanity Studio to the cloud:

```bash
cd sanity-studio
npm run deploy
```

Your studio will be available at: `https://your-project.sanity.studio`

## 📝 Content Types Available

### 1. Hero Section
- Experience badge
- Portfolio title (line 1 & 2)
- Subtitle
- Metadata (year, copyright)
- CTA button text

### 2. About Section
- Heading (3 lines)
- Description
- Profile image
- Design philosophy
- Marquee text

### 3. Projects
- Title
- Category (Posters, Logo, Branding, Packaging, Presentation)
- Description
- Image
- Order
- Featured flag

### 4. Selected Works
- Title
- Description
- Category
- Image
- Background color
- Order

### 5. Resume
- Name
- Title
- Bio
- Profile image
- Resume URL
- Experience
- Education
- Skills
- Social links

### 6. Contact
- Heading
- Subheading
- Email
- Phone
- Location
- Social media links

### 7. AnshikaOS Apps
- App ID
- Title
- Icon
- Icon color
- App type (about, work, resume, todo, text, spotify)
- Content (text, image, items, file URL)
- Default size

### 8. Desktop Configuration
- Title
- Sticky note content
- Welcome text
- Desktop icons
- Background
- Menu bar settings

## 🔧 How to Add/Edit Content

### Adding a New Project

1. Go to Sanity Studio
2. Click "Project" in the sidebar
3. Click "Create new Project"
4. Fill in:
   - Title
   - Category
   - Description
   - Upload image
   - Set order number
5. Click "Publish"

### Editing Hero Section

1. Go to Sanity Studio
2. Click "Hero" in the sidebar
3. Edit the fields
4. Click "Publish"

### Adding Images

1. When editing any content with an image field
2. Click "Select" or "Upload"
3. Choose your image
4. Add alt text for accessibility
5. Click "Publish"

## 🌐 CORS Configuration

If you're accessing Sanity from a custom domain, add it to CORS settings:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "API" → "CORS Origins"
4. Add your Netlify domain: `https://your-site.netlify.app`
5. Add your custom domain (if any)

## 🔐 Environment Variables (Optional)

If you need authenticated access (for write operations):

### Local Development (.env)
```env
VITE_SANITY_PROJECT_ID=7yt3l4pv
VITE_SANITY_DATASET=production
VITE_SANITY_API_TOKEN=your-token-here
```

### Netlify Environment Variables
1. Go to Site settings → Environment variables
2. Add:
   - `VITE_SANITY_PROJECT_ID` = `7yt3l4pv`
   - `VITE_SANITY_DATASET` = `production`
   - `VITE_SANITY_API_TOKEN` = `your-token` (if needed)

## 📊 Seeding Data

To populate your Sanity studio with initial data:

```bash
cd sanity-studio
npm run seed
```

This will create:
- Sample hero content
- About section
- Sample projects
- Selected works
- OS apps
- Desktop configuration

## 🔄 Content Updates

### Automatic Updates
- Content changes in Sanity appear immediately (CDN cache: ~60 seconds)
- No need to redeploy your Netlify site
- Images are served from Sanity's CDN

### Manual Refresh
If content doesn't update:
1. Clear browser cache
2. Wait 60 seconds for CDN refresh
3. Check Sanity Studio for published content

## 🎨 Image Optimization

Sanity automatically optimizes images. You can customize:

```typescript
// In your components
urlFor(image)
  .width(800)        // Set width
  .height(600)       // Set height
  .quality(90)       // Set quality (0-100)
  .format('webp')    // Set format
  .url()
```

## 🐛 Troubleshooting

### Images Not Loading

**Problem**: Images show broken or don't load

**Solutions**:
1. Check image is published in Sanity Studio
2. Verify CORS settings include your domain
3. Check browser console for errors
4. Ensure image URL is valid

### Content Not Updating

**Problem**: Changes in Sanity don't appear on site

**Solutions**:
1. Verify content is published (not just saved as draft)
2. Wait 60 seconds for CDN cache
3. Clear browser cache
4. Check network tab for API calls

### Sanity Studio Won't Start

**Problem**: `npm run dev` fails in sanity-studio

**Solutions**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check Node version (requires Node 20+)
4. Verify `sanity.config.ts` is correct

## 📱 Mobile Images

All images are responsive and optimized for mobile:
- Automatic format conversion (WebP)
- Responsive sizing
- Lazy loading
- CDN delivery

## 🔗 Useful Links

- **Sanity Dashboard**: https://www.sanity.io/manage
- **Sanity Documentation**: https://www.sanity.io/docs
- **Image URL Builder**: https://www.sanity.io/docs/image-url
- **GROQ Query Language**: https://www.sanity.io/docs/groq

## 📋 Content Checklist

Before going live, ensure you have:

- [ ] Hero section content
- [ ] About section with profile image
- [ ] At least 4-6 projects
- [ ] 2-3 selected works
- [ ] Resume information
- [ ] Contact details
- [ ] OS apps configured
- [ ] All images uploaded and optimized
- [ ] CORS configured for your domain
- [ ] Content published (not drafts)

## 🎯 Best Practices

1. **Images**: Use high-quality images (min 1200px wide)
2. **Alt Text**: Always add descriptive alt text
3. **Order**: Use order field to control display sequence
4. **Categories**: Be consistent with category names
5. **Publish**: Always publish after editing
6. **Backup**: Export content regularly from Sanity dashboard

## 🚨 Important Notes

- **Public Read Access**: Your content is publicly readable (no auth required)
- **Write Access**: Requires authentication token
- **CDN Cache**: Content updates may take up to 60 seconds
- **Image CDN**: Images are served from Sanity's global CDN
- **No Rebuild**: Content changes don't require Netlify rebuild

---

**Last Updated**: November 25, 2025
**Sanity Project**: 7yt3l4pv
**Dataset**: production
