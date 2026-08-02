import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'td7vyie0',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-07-31',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
