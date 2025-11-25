export interface SanityImage {
  asset: {
    _id: string
    url: string
  }
  alt?: string
}

export interface HeroData {
  experienceBadge: string
  portfolioTitle: {
    line1: string
    line2: string
  }
  subtitle: {
    line1: string
    line2: string
  }
  metadata: {
    copyright: string
    year: string
  }
  ctaButton: {
    text: string
    icon: string
  }
}

export interface AboutData {
  heading: {
    line1: string
    line2: string
    line3: string
  }
  description: string
  profileImage: SanityImage
  designPhilosophy: {
    title: string
    content: string
  }
  marqueeText: string
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  category: 'Posters' | 'Logo' | 'Branding' | 'Packaging' | 'Presentation'
  description?: string
  image?: SanityImage
  order: number
  featured: boolean
}

export interface SelectedWork {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  category: string
  image?: SanityImage
  backgroundColor: string
  order: number
}

export interface ResumeData {
  name: string
  title: string
  bio: string
  profileImage: SanityImage
  resumeUrl?: string
  experience: Array<{
    company: string
    role: string
    period: string
  }>
  education: {
    institution: string
    period: string
  }
  skills: {
    design: string[]
    tools: string[]
  }
  socialLinks: {
    linkedin?: string
    behance?: string
    instagram?: string
    email?: string
  }
}

export interface ContactData {
  heading: string
  subheading: string
  email: string
  phone?: string
  location?: string
  socialMedia: {
    linkedin?: string
    behance?: string
    instagram?: string
  }
}

export interface OSApp {
  _id: string
  appId: string
  title: string
  icon: string
  iconColor?: string
  order: number
  appType: 'about' | 'work' | 'resume' | 'todo' | 'gallery' | 'spotify' | 'text' | 'trash'
  content?: {
    text?: string
    image?: string
    items?: string[]
    fileUrl?: string
  }
  defaultSize?: {
    width: number
    height: number
  }
}

export interface DesktopIcon {
  id: string
  label: string
  iconType: 'folder' | 'pdf' | 'text' | 'image' | 'trash'
  badge?: string
  position: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
  linkedApp?: {
    _id: string
    appId: string
    title: string
  }
  order: number
}

export interface AnshikaOSDesktop {
  _id: string
  title: string
  stickyNote: {
    title: string
    items: string[]
    backgroundColor: string
    rotation: number
    position: {
      top: number
      left: number
    }
  }
  welcomeText: {
    line1: string
    line2: string
    visible: boolean
  }
  desktopIcons: DesktopIcon[]
  background: {
    color: string
    gridEnabled: boolean
    gridSize: number
    gridOpacity: number
  }
  menuBar: {
    title: string
    menuItems: string[]
  }
}
