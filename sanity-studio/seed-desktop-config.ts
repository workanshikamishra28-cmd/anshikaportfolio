import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const desktopConfig = {
  _type: 'anshikaOSDesktop',
  title: 'Desktop Configuration',
  
  stickyNote: {
    title: 'To do:',
    items: [
      'Land my dream UX job',
      'Drink water',
      'Move to the US',
      'Finish grad school without losing my mind',
      'Build that banger spotify playlist',
      'World domination',
      'Get really good at making pasta',
      'Travel somewhere new every year',
    ],
    backgroundColor: '#fef3c7',
    rotation: -1.5,
    position: {
      top: 32,
      left: 32,
    },
  },

  welcomeText: {
    line1: 'welcome to my',
    line2: 'portfolio.',
    visible: true,
  },

  desktopIcons: [
    {
      id: 'resume-pdf',
      label: 'Resume.pdf',
      iconType: 'pdf',
      position: {
        top: 32,
        right: 32,
      },
      order: 1,
    },
    {
      id: 'about-me',
      label: 'About Me',
      iconType: 'folder',
      position: {
        top: 256,
        left: 64,
      },
      order: 2,
    },
    {
      id: 'project-02',
      label: 'Project 02\n(Simplething)',
      iconType: 'folder',
      position: {
        top: 128,
        right: 32,
      },
      order: 3,
    },
    {
      id: 'project-01',
      label: 'Project 01\n(AbsolutMess)',
      iconType: 'folder',
      position: {
        top: 224,
        right: 32,
      },
      order: 4,
    },
    {
      id: 'project-03',
      label: 'Project 03\n(Leafpress)',
      iconType: 'folder',
      position: {
        top: 320,
        right: 32,
      },
      order: 5,
    },
    {
      id: 'project-04',
      label: 'Project 04\n(Amazon)',
      iconType: 'folder',
      badge: 'aws',
      position: {
        bottom: 128,
        right: 32,
      },
      order: 6,
    },
    {
      id: 'trash',
      label: "Don't Look",
      iconType: 'trash',
      position: {
        bottom: 32,
        right: 32,
      },
      order: 7,
    },
  ],

  background: {
    color: '#e8e8e8',
    gridEnabled: true,
    gridSize: 30,
    gridOpacity: 0.2,
  },

  menuBar: {
    title: 'Anshika Mishra Portfolio',
    menuItems: ['Contact', 'Resume'],
  },
}

async function seedDesktopConfig() {
  console.log('Starting Desktop Configuration seed...')

  try {
    const result = await client.create(desktopConfig)
    console.log(`✅ Created: Desktop Configuration (${result._id})`)
  } catch (error) {
    console.error('❌ Error creating desktop configuration:', error)
  }

  console.log('✨ Desktop Configuration seed complete!')
}

seedDesktopConfig()
