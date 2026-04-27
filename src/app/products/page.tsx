'use client'

import { getProducts } from '@/sanity/client'
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types/sanity'
import { useState } from 'react'

export default async function ProductsPage() {
  const products = await getProducts() as Product[]

  const categories = [
    { title: 'All', value: 'all' },
    { title: 'Toys', value: 'toy' },
    { title: 'Figures', value: 'figure' },
    { title: 'Decorations', value: 'decoration' },
    { title: 'Custom', value: 'custom' },
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-4 text-4xl font-bold text-center">Our Collection</h1>
      <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
        Explore our range of unique, high-quality 3D printed creations. Each item is made to order.
      </p>

      <div className="flex justify-center mb-12">
        <div className="flex gap-3 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-6 py-2 rounded-full transition-all border ${
                selectedCategory === cat.value
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-black'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
          <p className="text-sm text-gray-400 mt-2">Try selecting a different category or add new products in Sanity Studio.</p>
        </div>
      )}
    </main>
  )
}
