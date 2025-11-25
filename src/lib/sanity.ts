import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: '7yt3l4pv',
  dataset: 'production',
  useCdn: true, // Use CDN - it's fine, just takes a moment to update
  apiVersion: '2024-01-01',
  // Add token for authenticated requests if needed (optional for public reads)
  // token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
