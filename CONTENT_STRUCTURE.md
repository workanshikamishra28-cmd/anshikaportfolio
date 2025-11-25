# 📋 Content Structure Guide

## Overview
This document shows exactly what content you can manage in Sanity CMS and how it maps to your portfolio.

---

## 🎯 Hero Section
**Location**: Homepage top section  
**Sanity Type**: `hero` (Single document)

### Fields:
```
Experience Badge
├─ Text: "+6 YEARS"
└─ Displays as: Rounded badge above title

Portfolio Title
├─ Line 1: "Port"
├─ Line 2: "folio"
└─ Displays as: Large animated typography

Subtitle
├─ Line 1: "A Visual Portfolio"
├─ Line 2: "Reflecting a Complete Creative Path"
└─ Displays as: Small text on desktop, below title on mobile

Metadata
├─ Copyright: "Anwarei"
├─ Year: "2026"
└─ Displays as: Bottom metadata bar

CTA Button
├─ Text: "Open AnshikaOS"
├─ Icon: "📱"
└─ Displays as: Button below title
```

---

## 👤 About Section
**Location**: Second section after hero  
**Sanity Type**: `about` (Single document)

### Fields:
```
Heading (3 lines)
├─ Line 1: "The"
├─ Line 2: "Creative" (italic, accent color)
├─ Line 3: "Journey Behind The"
└─ Displays as: Large stacked heading

Description
└─ Multi-line text about your journey
   Displays as: Paragraph below heading

Profile Image
├─ Image file
├─ Alt text
└─ Displays as: Circular framed image

Design Philosophy
├─ Title: "Designs"
├─ Content: Your philosophy text
└─ Displays as: Dashed border box

Marquee Text
└─ Text: "about me"
   Displays as: Scrolling text at top
```

---

## 🎨 Projects
**Location**: Projects section with category filters  
**Sanity Type**: `project` (Multiple documents)

### Fields per Project:
```
Title
└─ Example: "Brand Identity Project"

Slug
└─ Auto-generated: "brand-identity-project"

Category (Select one)
├─ Posters
├─ Logo
├─ Branding
├─ Packaging
└─ Presentation

Image
├─ Project image
└─ Alt text

Description
└─ Optional project description

Display Order
└─ Number (lower = appears first)

Featured
└─ Checkbox (shows in selected works if true)
```

### Categories:
- **All**: Shows all projects
- **Posters**: Poster designs
- **Logo**: Logo designs
- **Branding**: Brand identity work
- **Packaging**: Package designs
- **Presentation**: Presentation templates

---

## ⭐ Selected Works
**Location**: Stacking cards showcase section  
**Sanity Type**: `selectedWork` (Multiple documents)

### Fields per Work:
```
Title
└─ Example: "Nimmalakunta - Place Branding"

Slug
└─ Auto-generated from title

Description
└─ Detailed project description
   Example: "Crafting a visual identity..."

Category
└─ Free text: "Branding", "UX Design", etc.

Image
├─ Featured work image
└─ Alt text

Background Color
└─ Hex code: "#10B981"
   Used as card background

Display Order
└─ Number (controls stacking order)
```

### Suggested Colors:
- `#10B981` - Green
- `#EC4899` - Pink
- `#F8EDEA` - Off-white
- `#1F2937` - Dark gray
- `#78201B` - Persian Plum

---

## 📄 Resume
**Location**: Resume section (split layout)  
**Sanity Type**: `resume` (Single document)

### Fields:
```
Name
└─ "ANSHIKA MISHRA"

Professional Title
└─ "GRAPHIC DESIGNER"

Bio
└─ Short paragraph about yourself

Profile Image
├─ Professional photo
└─ Alt text

Experience (Array)
├─ Entry 1:
│   ├─ Company: "Freelance"
│   ├─ Role: "Designer"
│   └─ Period: "2022 → Present"
├─ Entry 2:
│   ├─ Company: "Design Studio"
│   ├─ Role: "Senior Designer"
│   └─ Period: "2019 → 2022"
└─ Add more entries...

Education
├─ Institution: "EDUCATION"
└─ Period: "2012 → 2016"

Skills
├─ Design Skills (Array)
│   ├─ "Branding"
│   ├─ "Illustration"
│   ├─ "Editorial Design"
│   └─ "Packaging"
└─ Tools (Array)
    ├─ "Adobe Creative Suite"
    ├─ "Figma"
    ├─ "Procreate"
    └─ "InDesign"

Social Links
├─ LinkedIn: URL
├─ Behance: URL
├─ Instagram: URL
└─ Email: email@example.com
```

---

## 📧 Contact
**Location**: Contact section with form  
**Sanity Type**: `contact` (Single document)

### Fields:
```
Heading
└─ "Let's Work Together"

Subheading
└─ "Have a project in mind? Let's create something beautiful together."

Email
└─ hello@anshika.design
   (Validated email format)

Phone
└─ "+1 234 567 8900"

Location
└─ "New York, NY"

Social Media
├─ LinkedIn: https://linkedin.com/...
├─ Behance: https://behance.net/...
└─ Instagram: https://instagram.com/...
```

---

## 🎨 Design Guidelines

### Colors to Use
- **Primary**: `#78201B` (Persian Plum)
- **Background**: `#F8EDEA` (Off-White)
- **Accent**: `#D4A574` (Gold)
- **Text**: Dark on light, light on dark

### Image Recommendations
- **Profile Images**: Square, 800x800px minimum
- **Project Images**: 4:3 ratio, 1200x900px recommended
- **Selected Works**: 1600x1200px for best quality
- **Format**: JPG or PNG, WebP for best performance

### Text Guidelines
- **Headings**: Keep short and impactful
- **Descriptions**: 2-3 sentences for projects
- **Bio**: 3-4 sentences maximum
- **Tone**: Professional yet personable

---

## 📊 Content Hierarchy

```
Portfolio
│
├── Hero (1 document)
│   └── First impression, main title
│
├── About (1 document)
│   └── Your story and philosophy
│
├── Projects (Multiple)
│   ├── Filterable by category
│   └── Grid layout
│
├── Selected Works (4-6 recommended)
│   ├── Featured projects
│   └── Stacking card layout
│
├── Resume (1 document)
│   └── Professional background
│
└── Contact (1 document)
    └── How to reach you
```

---

## ✅ Content Checklist

### Initial Setup
- [ ] Add Hero content
- [ ] Add About content with profile image
- [ ] Create at least 8-12 projects
- [ ] Create 4 selected works
- [ ] Add resume information
- [ ] Add contact details

### Images
- [ ] Upload profile image (About)
- [ ] Upload profile image (Resume)
- [ ] Upload project images
- [ ] Upload selected work images
- [ ] Add alt text to all images

### Links
- [ ] Add social media URLs
- [ ] Verify email addresses
- [ ] Test all external links

### Content Quality
- [ ] Proofread all text
- [ ] Check for consistent tone
- [ ] Verify dates and periods
- [ ] Ensure proper capitalization

---

## 🔄 Update Workflow

1. **Open Studio**: `npm run studio`
2. **Navigate**: Click section in sidebar
3. **Edit**: Update fields
4. **Save**: Click "Publish"
5. **View**: Refresh portfolio to see changes

---

## 💡 Tips

### For Projects
- Use consistent naming: "Project Name - Type"
- Set display order: 1, 2, 3, etc.
- Mark best work as "Featured"
- Add descriptive alt text for SEO

### For Selected Works
- Choose contrasting background colors
- Write engaging descriptions
- Order by importance (1 = top)
- Use high-quality images

### For Resume
- Keep experience entries concise
- Use consistent date format: "YYYY → YYYY"
- List most recent first
- Update regularly

### For Images
- Optimize before upload (compress)
- Use descriptive filenames
- Always add alt text
- Maintain consistent aspect ratios

---

## 🎯 Content Strategy

### Homepage (Hero + About)
**Goal**: Make strong first impression  
**Content**: Bold, confident, personal

### Projects
**Goal**: Show breadth of work  
**Content**: Variety of categories, clear titles

### Selected Works
**Goal**: Highlight best projects  
**Content**: Detailed descriptions, storytelling

### Resume
**Goal**: Professional credibility  
**Content**: Clear, factual, organized

### Contact
**Goal**: Easy to reach  
**Content**: Multiple contact options, friendly tone

---

This structure ensures your portfolio content is organized, maintainable, and impactful! 🚀
