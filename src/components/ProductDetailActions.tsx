'use client'

import { useCart } from '@/context/CartContext'

interface ProductDetailActionsProps {
  product: {
    _id: string
    title: string
    price: number
    image?: string
  }
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem } = useCart()

  return (
    <div className="flex gap-4">
      <button
        onClick={() => addItem({
          id: product._id,
          title: product.title,
          price: product.price,
          image: product.image
        })}
        className="flex-1 bg-black text-white py-4 px-8 rounded-full hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-95 font-semibold"
      >
        Add to Cart
      </button>
      <button className="border border-gray-200 py-4 px-6 rounded-full hover:bg-gray-50 transition-colors">
        ❤️
      </button>
    </div>
  )
}
