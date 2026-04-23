export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface Product {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: SanityImage
  gallery?: SanityImage[]
  price: number
  discountPrice?: number
  isOnSale: boolean
  description?: unknown // Rich text is complex
  category: string
  printHeight?: number
  printMaterial?: string
  inStock: boolean
  featured: boolean
}

export interface SiteSettings {
  title: string
  description: string
  logo: SanityImage
  bannerTitle: string
  bannerSubtitle: string
  aboutText: unknown
  socialLinks: {
    instagram?: string
    twitter?: string
    tiktok?: string
    youtube?: string
  }
}
