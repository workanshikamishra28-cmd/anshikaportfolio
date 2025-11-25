import { client } from './sanity'

// Hero Section
export async function getHeroData() {
  const query = `*[_type == "hero"][0]{
    experienceBadge,
    portfolioTitle,
    subtitle,
    metadata,
    ctaButton
  }`
  return await client.fetch(query)
}

// About Section
export async function getAboutData() {
  const query = `*[_type == "about"][0]{
    heading,
    description,
    profileImage{
      asset->{
        _id,
        url
      },
      alt
    },
    designPhilosophy,
    marqueeText
  }`
  return await client.fetch(query)
}

// Projects
export async function getProjects(category?: string) {
  const filter = category && category !== 'All' 
    ? `*[_type == "project" && category == "${category}"]` 
    : `*[_type == "project"]`
  
  const query = `${filter} | order(order asc){
    _id,
    title,
    slug,
    category,
    description,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    order,
    featured
  }`
  return await client.fetch(query)
}

// Selected Works
export async function getSelectedWorks() {
  const query = `*[_type == "selectedWork"] | order(order asc){
    _id,
    title,
    slug,
    description,
    category,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    backgroundColor,
    order
  }`
  return await client.fetch(query)
}

// Resume
export async function getResumeData() {
  const query = `*[_type == "resume"][0]{
    name,
    title,
    bio,
    profileImage{
      asset->{
        _id,
        url
      },
      alt
    },
    resumeUrl,
    experience,
    education,
    skills,
    socialLinks
  }`
  return await client.fetch(query)
}

// Contact
export async function getContactData() {
  const query = `*[_type == "contact"][0]{
    heading,
    subheading,
    email,
    phone,
    location,
    socialMedia
  }`
  return await client.fetch(query)
}

// OS Apps
export async function getOSApps() {
  const query = `*[_type == "osApp"] | order(order asc){
    _id,
    appId,
    title,
    icon,
    iconColor,
    order,
    appType,
    content{
      text,
      image{
        asset->{
          _id,
          url
        }
      },
      items,
      fileUrl
    },
    defaultSize
  }`
  return await client.fetch(query)
}

// AnshikaOS Desktop Configuration
export async function getDesktopConfig() {
  const query = `*[_type == "anshikaOSDesktop"][0]{
    _id,
    title,
    stickyNote,
    welcomeText,
    desktopIcons[]{
      ...,
      linkedApp->{
        _id,
        appId,
        title
      }
    },
    background,
    menuBar
  }`
  return await client.fetch(query)
}
