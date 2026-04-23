import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="container mx-auto px-4 py-32 text-center">
      <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-12 max-w-md mx-auto">
        Thank you for your purchase. We have received your order and will start 3D printing your items soon.
      </p>
      <Link
        href="/products"
        className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
      >
        Continue Shopping
      </Link>
    </main>
  )
}
