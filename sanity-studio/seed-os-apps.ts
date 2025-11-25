import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const osApps = [
  {
    _type: 'osApp',
    appId: 'about-me',
    title: 'About Me',
    icon: 'FaUser',
    iconColor: '#78201B',
    order: 1,
    appType: 'about',
    content: {
      text: `Hi! I'm Anshika, a designer with a sharp eye for detail and a soft spot for bold, human-centered ideas. I craft intuitive products and interfaces that simplify complexity—whether it's streamlining workflows, visualizing data, or making technology feel less... techy.

Currently pursuing my master's in Human-Computer Interaction at UMD, I thrive at the intersection of strategy, aesthetics, and usability. Whether I'm building seamless experiences or breaking the grid with experimental visuals, my goal is always the same: make it work beautifully.`,
    },
    defaultSize: {
      width: 600,
      height: 500,
    },
  },
  {
    _type: 'osApp',
    appId: 'work',
    title: 'Work',
    icon: 'FaBriefcase',
    iconColor: '#D4A574',
    order: 2,
    appType: 'work',
    content: {
      text: 'Browse through my design projects and case studies.',
    },
    defaultSize: {
      width: 700,
      height: 600,
    },
  },
  {
    _type: 'osApp',
    appId: 'resume',
    title: 'Resume',
    icon: 'FaFileAlt',
    iconColor: '#5c1a1a',
    order: 3,
    appType: 'resume',
    content: {
      text: 'Download my resume to learn more about my experience.',
      fileUrl: '/resume.pdf',
    },
    defaultSize: {
      width: 500,
      height: 400,
    },
  },
  {
    _type: 'osApp',
    appId: 'todo',
    title: 'To do:',
    icon: 'FaListUl',
    iconColor: '#ffbd44',
    order: 4,
    appType: 'todo',
    content: {
      items: [
        'Land my dream UX job',
        'Drink water',
        'Move to the US',
        'Finish grad school without losing my mind',
        'Build that banger spotify playlist',
        'World domination',
        'Get better at making pasta',
        'Travel somewhere new every year',
      ],
    },
    defaultSize: {
      width: 450,
      height: 500,
    },
  },
  {
    _type: 'osApp',
    appId: 'project-01',
    title: 'Project 01 (Simplething)',
    icon: 'FaImages',
    iconColor: '#00ca4e',
    order: 5,
    appType: 'text',
    content: {
      text: `So... this one's a trip

I designed a cocktail recipe site where the layout intentionally breaks the grid—because what's a cocktail without a little chaos? This was my playground for visual design experiments: bold colors, weird type, and microinteractions that get a little more unhinged the further you scroll (yes, I wanted you to feel drunk by the end).

If you're into seeing how my brain throws a party (with rules), this is the project to dive into.`,
    },
    defaultSize: {
      width: 550,
      height: 450,
    },
  },
  {
    _type: 'osApp',
    appId: 'project-02',
    title: 'Project 02 (Absolutliness)',
    icon: 'FaFileCode',
    iconColor: '#ff605c',
    order: 6,
    appType: 'text',
    content: {
      text: `AbsolutMess (Project #1)
Visual Design & UI

Full case study fig`,
    },
    defaultSize: {
      width: 500,
      height: 400,
    },
  },
  {
    _type: 'osApp',
    appId: 'project-03',
    title: 'Project 03 (Leafpress)',
    icon: 'FaFileCode',
    iconColor: '#28c840',
    order: 7,
    appType: 'text',
    content: {
      text: 'Leafpress project details coming soon...',
    },
    defaultSize: {
      width: 500,
      height: 400,
    },
  },
  {
    _type: 'osApp',
    appId: 'project-04',
    title: 'Project 04 (Amazon)',
    icon: 'FaFileCode',
    iconColor: '#ff9500',
    order: 8,
    appType: 'text',
    content: {
      text: 'Amazon project details coming soon...',
    },
    defaultSize: {
      width: 500,
      height: 400,
    },
  },
  {
    _type: 'osApp',
    appId: 'trash',
    title: "Don't Look",
    icon: 'FaTrash',
    iconColor: '#8e8e93',
    order: 9,
    appType: 'trash',
    content: {
      text: 'Nothing to see here... or is there? 🗑️',
    },
    defaultSize: {
      width: 400,
      height: 350,
    },
  },
]

async function seedOSApps() {
  console.log('Starting OS Apps seed...')

  for (const app of osApps) {
    try {
      const result = await client.create(app)
      console.log(`✅ Created: ${app.title} (${result._id})`)
    } catch (error) {
      console.error(`❌ Error creating ${app.title}:`, error)
    }
  }

  console.log('✨ OS Apps seed complete!')
}

seedOSApps()
