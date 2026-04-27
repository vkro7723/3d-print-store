import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug, urlFor } from '@/sanity/client'
import { ProductDetailActions } from '@/components/ProductDetailActions'
import { Product } from '@/types/sanity'

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug) as Product

  if (!product) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <Link href="/products" className="text-gray-500 hover:text-black mb-8 inline-flex items-center gap-2 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-gray-50 aspect-square relative rounded-2xl overflow-hidden border border-gray-100">
            {product.mainImage ? (
              <Image
                src={urlFor(product.mainImage)?.url() || ''}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          
          {/* Gallery - If available */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.gallery.map((img, idx) => (
                <div key={idx} className="bg-gray-50 aspect-square relative rounded-lg overflow-hidden border border-gray-100 cursor-pointer hover:border-black transition-colors">
                  <Image src={urlFor(img)?.url() || ''} alt={`${product.title} ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              {product.isOnSale && product.discountPrice ? (
                <>
                  <p className="text-3xl text-red-600 font-bold">${product.discountPrice.toFixed(2)}</p>
                  <p className="text-xl text-gray-400 line-through">${product.price.toFixed(2)}</p>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                    SALE
                  </span>
                </>
              ) : (
                <p className="text-3xl text-gray-900 font-medium">${product.price.toFixed(2)}</p>
              )}
            </div>
          </div>

          <div className="prose prose-blue mb-10 text-gray-600">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Description</h2>
            <p>{typeof product.description === 'string' ? product.description : 'Handcrafted with precision using high-quality 3D printing technology.'}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10 py-6 border-y border-gray-100">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Material</h3>
              <p className="font-semibold">{product.printMaterial || 'Premium PLA'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Height</h3>
              <p className="font-semibold">{product.printHeight ? `${product.printHeight}mm` : 'Standard'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Stock Status</h3>
              <p className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>

          <ProductDetailActions 
            product={{
              _id: product._id,
              title: product.title,
              price: product.isOnSale && product.discountPrice ? product.discountPrice : product.price,
              image: product.mainImage ? (urlFor(product.mainImage)?.url() || undefined) : undefined
            }} 
          />
          
          <p className="mt-6 text-sm text-gray-500 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.58 16.11a7 7 0 0 1 6.84 0"/><circle cx="12" cy="20" r="1"/></svg>
            Worldwide shipping available. Each item is made to order.
          </p>
        </div>
      </div>
    </main>
  )
}
