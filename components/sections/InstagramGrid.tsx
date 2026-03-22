import Image from 'next/image'

const posts = [
  { src: '/photos/instagram/1.png', alt: 'Reception table setting at The Vale' },
  { src: '/photos/instagram/2.png', alt: 'Bride at the ceremony altar' },
  { src: '/photos/instagram/3.png', alt: 'Birthday celebration with pink balloon arch' },
  { src: '/photos/instagram/4.png', alt: 'Couple first dance under string lights' },
  { src: '/photos/instagram/5.png', alt: 'Evening event at The Vale under string lights' },
  { src: '/photos/instagram/6.png', alt: 'Community event — full venue at capacity' },
]

export default function InstagramGrid() {
  return (
    <section className="bg-neutral-50 py-section px-5 md:px-page border-t border-rule">
      <div className="max-w-content mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600 mb-4">
              @thevaleprovoutah
            </p>
            <h2 className="font-serif font-semibold text-4xl text-neutral-800 tracking-tightest">
              The space in{' '}
              <em className="italic text-gold-600">action</em>.
            </h2>
          </div>
          <a
            href="https://www.instagram.com/thevaleprovoutah"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-semibold text-2xs uppercase tracking-btn text-neutral-500 hover:text-neutral-800 transition-colors duration-fast flex-shrink-0"
          >
            Follow on Instagram →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-[3px]">
          {posts.map((post, i) => (
            <div key={i} className="relative aspect-square overflow-hidden">
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-slow hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
