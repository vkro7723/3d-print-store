import { getProducts } from '@/sanity/client'
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types/sanity'

export default async function ProductsPage() {
  const products = await getProducts() as Product[]

  const categories = [
    { title: 'All', value: 'all' },
    { title: 'Toys', value: 'toy' },
    { title: 'Figures', value: 'figure' },
    { title: 'Decorations', value: 'decoration' },
    { title: 'Custom', value: 'custom' },
  ]

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-4 text-4xl font-bold text-center">Our Collection</h1>
      <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
        Explore our range of unique, high-quality 3D printed creations. Each item is made to order.
      </p>

      {/* Categories - Static for now, can be made dynamic later */}
      <div className="flex justify-center mb-12">
        <div className="flex gap-3 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`px-6 py-2 rounded-full transition-all border ${
                cat.value === 'all'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-black'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-500 text-lg">Your store is ready for products!</p>
          <p className="text-sm text-gray-400 mt-2">Log in to Sanity Studio to add your first 3D printed item.</p>
        </div>
      )}
    </main>
  )
}
