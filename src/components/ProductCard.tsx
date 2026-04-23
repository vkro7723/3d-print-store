'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types/sanity'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="group border rounded-lg p-4 text-center hover:shadow-lg transition-shadow bg-white">
      <Link href={`/products/${product.slug.current}`}>
        <div className="relative bg-gray-100 aspect-square mb-4 overflow-hidden rounded-md">
          {product.mainImage ? (
            <Image
              src={urlFor(product.mainImage).url()}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 truncate">
          {product.title}
        </h3>
        <p className="text-gray-500 mb-4">${product.price.toFixed(2)}</p>
      </Link>
      <button
        onClick={() => addItem({
          id: product._id,
          title: product.title,
          price: product.price,
          image: product.mainImage ? urlFor(product.mainImage).url() : undefined
        })}
        className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors text-sm"
      >
        Add to Cart
      </button>
    </div>
  )
}
