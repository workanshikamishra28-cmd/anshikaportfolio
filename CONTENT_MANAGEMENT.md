# Content Management Quick Reference

## 🎯 Quick Actions

### Update Profile Image
1. Open Sanity Studio: `cd sanity-studio && npm run dev`
2. Go to "About" section
3. Click on Profile Image field
4. Upload new image or select from library
5. Click "Publish"
6. Wait 60 seconds → Image updates on live site

### Add New Project
1. Open Sanity Studio
2. Click "Project" → "Create new Project"
3. Fill in:
   - **Title**: Project name
   - **Category**: Choose from dropdown
   - **Description**: Brief description
   - **Image**: Upload project image
   - **Order**: Number for sorting (lower = first)
4. Click "Publish"
5. Project appears immediately on site

### Update Hero Text
1. Open Sanity Studio
2. Click "Hero"
3. Edit fields:
   - Experience Badge (e.g., "+6 YEARS")
   - Portfolio Title Line 1 (e.g., "Port")
   - Portfolio Title Line 2 (e.g., "folio")
   - Subtitle lines
   - CTA Button text
4. Click "Publish"

### Change Contact Information
1. Open Sanity Studio
2. Click "Contact"
3. Update:
   - Email
   - Phone
   - Location
   - Social media links
4. Click "Publish"

## 📸 Image Guidelines

### Recommended Sizes
- **Profile Image**: 800x800px (square)
- **Project Images**: 1200x900px (4:3 ratio)
- **Selected Works**: 1600x1200px (4:3 ratio)
- **OS App Images**: 800x600px

### File Formats
- **Best**: JPG for photos, PNG for graphics
- **Sanity Auto-converts**: WebP for web delivery
- **Max Size**: 10MB per image

### Image Optimization Tips
1. Use high-quality source images
2. Let Sanity handle compression
3. Add descriptive alt text
4. Use consistent aspect ratios

## 🔄 Content Update Workflow

### Daily Updates
```
1. Open Sanity Studio
2. Make changes
3. Click "Publish"
4. Wait 60 seconds
5. Refresh website
```

### Bulk Updates
```
1. Prepare all content/images
2. Open Sanity Studio
3. Update multiple items
4. Publish each one
5. Verify on live site
```

## 🎨 Styling Guidelines

### Colors (Match Portfolio Theme)
- **Primary**: #78201B (Persian Plum)
- **Accent**: #D4A574 (Gold)
- **Background**: #F8EDEA (Off-White)

### Text Guidelines
- **Headings**: Keep short and impactful
- **Descriptions**: 2-3 sentences max
- **Categories**: Use existing categories
- **Alt Text**: Describe image content

## 📱 Mobile Considerations

### Image Aspect Ratios
- **Square (1:1)**: Profile images
- **Landscape (4:3)**: Project images
- **Portrait (3:4)**: Avoid (doesn't work well on mobile)

### Text Length
- **Mobile Headlines**: Max 40 characters
- **Mobile Descriptions**: Max 150 characters
- **Desktop**: Can be longer

## 🚀 Publishing Checklist

Before publishing new content:

- [ ] Images are high quality
- [ ] Alt text is added
- [ ] Text is proofread
- [ ] Links are tested
- [ ] Order numbers are set
- [ ] Preview looks good
- [ ] Published (not draft)

## 🐛 Common Issues & Fixes

### Issue: Image Not Showing
**Fix**: 
1. Check image is published
2. Verify image URL in browser
3. Clear browser cache
4. Wait 60 seconds for CDN

### Issue: Content Not Updating
**Fix**:
1. Ensure you clicked "Publish" (not just "Save")
2. Check you're editing the right document
3. Clear browser cache
4. Hard refresh (Ctrl+Shift+R)

### Issue: Wrong Image Size
**Fix**:
1. Upload higher resolution image
2. Sanity will auto-optimize
3. Use recommended sizes above

### Issue: Broken Layout
**Fix**:
1. Check text length isn't too long
2. Verify image aspect ratio
3. Test on mobile device
4. Contact developer if persists

## 📊 Content Strategy

### Projects Section
- **Minimum**: 6 projects
- **Recommended**: 12-20 projects
- **Categories**: Distribute evenly
- **Update**: Add new projects monthly

### Selected Works
- **Minimum**: 3 works
- **Recommended**: 4-6 works
- **Quality**: Only best work
- **Update**: Quarterly

### About Section
- **Profile Image**: Update yearly
- **Bio**: Update when role changes
- **Philosophy**: Keep timeless

## 🔐 Access Management

### Sanity Studio Access
- **URL**: https://your-project.sanity.studio
- **Login**: Use your Sanity account
- **Permissions**: Admin access required

### Team Members
To add team members:
1. Go to Sanity Dashboard
2. Project Settings → Members
3. Invite by email
4. Set permissions (Admin/Editor/Viewer)

## 📈 Analytics & Monitoring

### Track Content Performance
1. Use Google Analytics on your site
2. Monitor which projects get most views
3. Update popular content regularly
4. Remove outdated projects

### Content Audit Schedule
- **Weekly**: Check for broken images
- **Monthly**: Update projects
- **Quarterly**: Review all content
- **Yearly**: Major content refresh

## 🎯 SEO Best Practices

### Image SEO
- Add descriptive alt text
- Use relevant file names
- Optimize image size
- Use WebP format (auto)

### Content SEO
- Use keywords in titles
- Write descriptive text
- Keep URLs clean
- Update regularly

## 📞 Support

### Need Help?
1. Check this guide first
2. Review SANITY_SETUP_COMPLETE.md
3. Visit Sanity documentation
4. Contact developer

### Emergency Issues
If site is broken:
1. Don't panic
2. Check Netlify deploy logs
3. Verify Sanity is accessible
4. Contact developer immediately

---

**Quick Links**:
- Sanity Studio: `cd sanity-studio && npm run dev`
- Sanity Dashboard: https://www.sanity.io/manage
- Live Site: https://your-site.netlify.app
- GitHub Repo: https://github.com/workanshikamishra28-cmd/anshikaportfolio
