import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any)
}

const isConfigured = projectId !== 'placeholder'

const MOCK_PRODUCTS = [
  {
    _id: '1',
    title: 'Articulated Dragon Toy',
    slug: { current: 'articulated-dragon' },
    mainImage: null,
    price: 24.99,
    category: 'toy',
    inStock: true,
    featured: true,
    description: 'A fully flexible, 3D printed dragon. Perfect for fidgeting and decoration.',
    printMaterial: 'Silk PLA',
    printHeight: 200
  },
  {
    _id: '2',
    title: 'Low-Poly T-Rex',
    slug: { current: 'low-poly-trex' },
    mainImage: null,
    price: 15.00,
    category: 'toy',
    inStock: true,
    featured: true,
    description: 'Classic low-poly dinosaur model. A must-have for any 3D printing enthusiast.',
    printMaterial: 'PLA',
    printHeight: 120
  },
  {
    _id: '3',
    title: 'Geometric Planter',
    slug: { current: 'geometric-planter' },
    mainImage: null,
    price: 19.99,
    category: 'decoration',
    inStock: true,
    featured: false,
    description: 'Modern geometric design planter. Adds a touch of math to your home decor.',
    printMaterial: 'PETG',
    printHeight: 100
  }
]

export async function getProducts() {
  if (!isConfigured) return MOCK_PRODUCTS
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      mainImage,
      price,
      discountPrice,
      isOnSale,
      category,
      inStock,
      featured
    }
  `)
}

export async function getProductBySlug(slug: string) {
  if (!isConfigured) return MOCK_PRODUCTS.find(p => p.slug.current === slug) || null
  return client.fetch(`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      gallery,
      price,
      discountPrice,
      isOnSale,
      description,
      category,
      printHeight,
      printMaterial,
      inStock,
      featured
    }
  `, { slug })
}

export async function getSiteSettings() {
  if (!isConfigured) return {
    bannerTitle: 'Personal 3D Print Brand',
    bannerSubtitle: 'Creative 3D printed toys and decorations for your collection.',
    aboutText: null
  }
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      title,
      description,
      logo,
      bannerTitle,
      bannerSubtitle,
      aboutText,
      socialLinks
    }
  `)
}

export async function getFeaturedProducts() {
  if (!isConfigured) return MOCK_PRODUCTS.filter(p => p.featured)
  return client.fetch(`
    *[_type == "product" && featured == true] | order(_createdAt desc) {
      _id,
      title,
      slug,
      mainImage,
      price,
      discountPrice,
      isOnSale,
      category,
      inStock
    }
  `)
}
