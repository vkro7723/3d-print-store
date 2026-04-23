import Link from 'next/link'
import { getFeaturedProducts, getSiteSettings } from '@/sanity/client'
import { ProductCard } from '@/components/ProductCard'
import { Product, SiteSettings } from '@/types/sanity'

export default async function Home() {
  const featuredProducts = await getFeaturedProducts() as Product[]
  const siteSettings = await getSiteSettings() as SiteSettings

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {siteSettings?.bannerTitle || 'Handcrafted 3D Printed Products'}
          </h1>
          <p className="mb-8 text-xl text-gray-600 max-w-2xl mx-auto">
            {siteSettings?.bannerSubtitle || 'Unique toys, figures & decorations made with precision and care.'}
          </p>
          <Link
            href="/products"
            className="inline-block rounded-full bg-black px-8 py-4 text-white hover:bg-gray-800 transition-all transform hover:scale-105"
          >
            Shop All Products
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Featured Collection</h2>
              <p className="text-gray-500 mt-2">Our most popular 3D printed creations</p>
            </div>
            <Link href="/products" className="text-blue-600 hover:underline font-medium">
              View All →
            </Link>
          </div>

          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
              <p className="text-gray-500">No featured products found.</p>
              <p className="text-sm text-gray-400 mt-1">Add some products in Sanity Studio and mark them as &quot;Featured&quot;.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold">About Our Brand</h2>
            <div className="text-lg text-gray-600 leading-relaxed">
              {siteSettings?.aboutText ? (
                <p>We create unique 3D printed products with attention to detail and quality. Each piece is carefully crafted to bring joy and wonder to your life.</p>
              ) : (
                <p>We are a boutique 3D printing studio focused on high-quality, unique designs. From playful toys to elegant home decor, our mission is to bring digital art into the physical world with precision and sustainability.</p>
              )}
            </div>
            <Link href="/about" className="mt-8 inline-block text-blue-600 hover:underline font-medium">
              Learn more about our process
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
