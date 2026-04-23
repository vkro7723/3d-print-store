export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Contact Us</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <p className="text-gray-600">hello@3dprintstore.com</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Response Time</label>
            <p className="text-gray-600">We typically respond within 24-48 hours</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Custom Orders</label>
            <p className="text-gray-600">
              Interested in custom 3D printing? Send us your ideas and we will get back to you with a quote.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
