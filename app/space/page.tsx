import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export default function SpacePage() {
  return (
    <>
      <Nav />
      <main className="flex-1 flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center px-5">
          <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600 mb-4">
            Coming soon
          </p>
          <h1 className="font-serif font-semibold text-5xl text-neutral-800 tracking-tightest">
            Not yet built.
          </h1>
        </div>
      </main>
      <Footer />
    </>
  )
}
