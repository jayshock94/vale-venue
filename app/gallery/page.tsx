import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import GalleryGrid from '@/components/sections/GalleryGrid'
import ClosingCTA from '@/components/sections/ClosingCTA'
import type { GalleryImage } from '@/components/sections/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos from weddings, corporate events, and private celebrations at The Vale in Provo, Utah.',
}

const validCategories = ['all', 'weddings', 'corporate', 'celebrations']

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const defaultCategory = validCategories.includes(category ?? '') ? category! : 'all'

  let images: GalleryImage[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('active', true)
      .order('sort_order')
    if (data) images = data
  } catch {
    // Fall through to placeholders
  }

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Page hero */}
        <section className="bg-neutral-800 pt-32 pb-20 px-5 md:px-page">
          <div className="max-w-content mx-auto">
            <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-300 mb-6">
              The Vale · Provo, Utah
            </p>
            <h1 className="font-serif font-semibold text-5xl text-neutral-50 tracking-tightest mb-6 max-w-xl">
              The space,{' '}
              <em className="italic text-gold-300">photographed</em>.
            </h1>
            <p className="font-sans font-regular text-md text-neutral-50 opacity-70 max-w-md">
              Weddings, corporate events, and private celebrations. Floor-to-ceiling
              windows and the Wasatch mountains behind every shot.
            </p>
          </div>
        </section>

        <section className="bg-neutral-50 py-section px-5 md:px-page">
          <div className="max-w-content mx-auto">
            <GalleryGrid images={images} defaultCategory={defaultCategory} />
          </div>
        </section>

        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
