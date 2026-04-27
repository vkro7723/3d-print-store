'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    // Option 1: WhatsApp Checkout (Direct Contact)
    const cartSummary = items.map(item => `${item.title} (x${item.quantity})`).join(', ')
    const whatsappMessage = encodeURIComponent(`Hi, I'd like to order: ${cartSummary}. Total: $${totalPrice.toFixed(2)}`)
    const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${whatsappMessage}`
    
    // For now, let's provide a choice or just use WhatsApp as the most reliable domestic->overseas method
    window.open(whatsappUrl, '_blank')
    setIsLoading(false)
  }

  const handlePayPalCheckout = () => {
    // Direct PayPal payment link (requires business email)
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=3D_Print_Order&amount=${totalPrice.toFixed(2)}&currency_code=USD`
    window.open(paypalUrl, '_blank')
  }

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <p className="text-gray-500 mb-8">Your cart is empty</p>
        <Link href="/products" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 border rounded-lg p-4">
                <div className="bg-gray-100 w-24 h-24 flex items-center justify-center rounded overflow-hidden relative">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  ) : (
                    <span className="text-gray-400 text-xs">No Image</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6 font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handlePayPalCheckout}
                disabled={isLoading}
                className="w-full bg-[#0070ba] text-white py-3 rounded-full font-bold hover:bg-[#003087] transition-colors flex items-center justify-center gap-2"
              >
                Pay with PayPal
              </button>
              
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-[#25D366] text-white py-3 rounded-full font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
              >
                Contact on WhatsApp
              </button>

              <button
                onClick={clearCart}
                className="w-full text-gray-500 text-sm py-2 hover:underline"
              >
                Clear Cart
              </button>
            </div>
            <Link href="/products" className="block text-center text-gray-500 text-sm mt-6 hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
