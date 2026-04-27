import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import productsData from '../data/products.json'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  if (!source) return null
  if (typeof source === 'string') return { url: () => source }
  return builder.image(source)
}

const isConfigured = projectId !== 'placeholder'

// Transform local JSON data to match expected Sanity types
const LOCAL_PRODUCTS = productsData.map(p => ({
  _id: p.id,
  title: p.title,
  slug: { current: p.slug },
  mainImage: p.image,
  price: p.price,
  discountPrice: p.discountPrice,
  isOnSale: p.isOnSale,
  category: p.category,
  description: p.description,
  printMaterial: p.material,
  printHeight: p.height,
  inStock: true,
  featured: true
}))

export async function getProducts() {
  if (!isConfigured) return LOCAL_PRODUCTS
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
  if (!isConfigured) return LOCAL_PRODUCTS.find(p => p.slug.current === slug) || null
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
  if (!isConfigured) return LOCAL_PRODUCTS
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
