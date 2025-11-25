/**
 * Seed Script for Sanity CMS
 * Run with: npx sanity exec seed-data.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const seedData = async () => {
  console.log('🌱 Starting to seed data...')

  try {
    // Hero Section
    const hero = await client.create({
      _type: 'hero',
      experienceBadge: '+6 YEARS',
      portfolioTitle: {
        line1: 'Port',
        line2: 'folio',
      },
      subtitle: {
        line1: 'A Visual Portfolio',
        line2: 'Reflecting a Complete Creative Path',
      },
      metadata: {
        copyright: 'Anwarei',
        year: '2026',
      },
      ctaButton: {
        text: 'Open AnshikaOS',
        icon: '📱',
      },
    })
    console.log('✅ Hero section created')

    // About Section
    const about = await client.create({
      _type: 'about',
      heading: {
        line1: 'The',
        line2: 'Creative',
        line3: 'Journey Behind The',
      },
      description:
        'My journey as a designer is driven by a deep-seated passion for continuous learning and creative exploration. I approach every project as an opportunity to merge artistic vision with technical skill, ensuring that the process is as thoughtful as the final product. This commitment allows me to consistently challenge creative boundaries and deliver solutions that are both innovative and effective.',
      designPhilosophy: {
        title: 'Designs',
        content:
          'For me, design transcends the role of a career; it is a powerful medium for creating work that resonates and makes a tangible, positive impact. The ultimate goal is to bring fresh ideas to life in meaningful ways, crafting visual experiences that connect with audiences and achieve their intended purpose. I am dedicated to building a portfolio of impactful work, one project at a time.',
      },
      marqueeText: 'about me',
    })
    console.log('✅ About section created')

    // Sample Projects
    const projectCategories = ['Posters', 'Logo', 'Branding', 'Packaging', 'Presentation']
    const projectTitles = [
      'Brand Identity Project',
      'Poster Design Series',
      'Packaging Design',
      'Logo Design Collection',
      'Visual Identity',
      'Presentation Template',
      'Event Poster',
      'Product Packaging',
      'Corporate Logo',
      'Brand Guidelines',
      'Marketing Presentation',
      'Concert Poster',
    ]

    for (let i = 0; i < projectTitles.length; i++) {
      await client.create({
        _type: 'project',
        title: projectTitles[i],
        slug: {
          _type: 'slug',
          current: projectTitles[i].toLowerCase().replace(/\s+/g, '-'),
        },
        category: projectCategories[i % projectCategories.length],
        description: `A creative ${projectCategories[i % projectCategories.length].toLowerCase()} project showcasing design excellence.`,
        order: i + 1,
        featured: i < 4,
      })
    }
    console.log('✅ Projects created')

    // Selected Works
    const selectedWorks = [
      {
        title: 'Nimmalakunta - Place Branding',
        description:
          'Crafting a visual identity for a village that already knew design long before Adobe did.',
        category: 'Branding',
        backgroundColor: '#10B981',
        order: 1,
      },
      {
        title: 'Yours Imperfectly',
        description:
          'A publication that swears every imperfection was on purpose. Any fault you find is probably intentional. Probably.',
        category: 'Editorial Design',
        backgroundColor: '#EC4899',
        order: 2,
      },
      {
        title: 'Yulu Redesign - UX Project',
        description:
          'A UX redesign with one goal - make booking a ride feel as smooth as taking one. One of my first UX projects and still one of my favorites.',
        category: 'UX Design',
        backgroundColor: '#F8EDEA',
        order: 3,
      },
      {
        title: 'SortMyScene',
        description:
          'Ergonomic Analysis & Redesign. A refresh that kept the good parts, fixed the rest.',
        category: 'UX Design',
        backgroundColor: '#1F2937',
        order: 4,
      },
    ]

    for (const work of selectedWorks) {
      await client.create({
        _type: 'selectedWork',
        ...work,
        slug: {
          _type: 'slug',
          current: work.title.toLowerCase().replace(/\s+/g, '-'),
        },
      })
    }
    console.log('✅ Selected works created')

    // Resume
    const resume = await client.create({
      _type: 'resume',
      name: 'ANSHIKA MISHRA',
      title: 'GRAPHIC DESIGNER',
      bio: 'Creative designer specializing in branding, illustration, editorial design, and packaging. With a passion for creating unique visual experiences that blend traditional craftsmanship with modern aesthetics.',
      experience: [
        {
          company: 'Freelance',
          role: 'Designer',
          period: '2022 → Present',
        },
        {
          company: 'Design Studio',
          role: 'Senior Designer',
          period: '2019 → 2022',
        },
        {
          company: 'Creative Agency',
          role: 'Designer',
          period: '2016 → 2019',
        },
      ],
      education: {
        institution: 'EDUCATION',
        period: '2012 → 2016',
      },
      skills: {
        design: ['Branding', 'Illustration', 'Editorial Design', 'Packaging'],
        tools: ['Adobe Creative Suite', 'Figma', 'Procreate', 'InDesign'],
      },
      socialLinks: {
        linkedin: 'https://linkedin.com',
        behance: 'https://behance.net',
        instagram: 'https://instagram.com',
        email: 'hello@anshika.design',
      },
    })
    console.log('✅ Resume created')

    // Contact
    const contact = await client.create({
      _type: 'contact',
      heading: "Let's Work Together",
      subheading: "Have a project in mind? Let's create something beautiful together.",
      email: 'hello@anshika.design',
      phone: '+1 234 567 8900',
      location: 'New York, NY',
      socialMedia: {
        linkedin: 'https://linkedin.com',
        behance: 'https://behance.net',
        instagram: 'https://instagram.com',
      },
    })
    console.log('✅ Contact information created')

    console.log('\n🎉 All seed data created successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Visit your Sanity Studio to add images')
    console.log('2. Update the content as needed')
    console.log('3. Start using the data in your components')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
  }
}

seedData()
