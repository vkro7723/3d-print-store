export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">About Our Brand</h1>

        <div className="prose prose-lg mx-auto">
          <p className="text-gray-600 mb-6">
            We are passionate about creating unique 3D printed products that bring joy and wonder to everyday life.
            Our journey began with a simple idea: to make custom-designed products accessible to everyone.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To deliver high-quality, creatively designed 3D printed products that inspire creativity
            and bring personalized joy to our customers worldwide.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">What Makes Us Special</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Each product is carefully crafted with attention to detail</li>
            <li>We use premium materials for durability and safety</li>
            <li>Custom orders are welcome - bring your ideas to life</li>
            <li>Worldwide shipping available</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
