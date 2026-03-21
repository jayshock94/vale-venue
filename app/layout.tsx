import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'The Vale — Modern Event Venue in Provo, Utah',
    template: '%s | The Vale Venue',
  },
  description:
    'Floor-to-ceiling windows. The Wasatch mountains behind you. A modern event space in Provo, Utah for weddings, corporate events, and private celebrations. Starting at $300.',
  keywords: [
    'event venue provo utah',
    'wedding venue provo',
    'corporate event space utah',
    'wasatch mountains venue',
    'private event space provo',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://valevenue.com',
    siteName: 'The Vale',
    title: 'The Vale — Modern Event Venue in Provo, Utah',
    description:
      'Floor-to-ceiling windows. The Wasatch mountains behind you. Weddings, corporate events, and private celebrations in Provo, Utah.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Vale — Modern Event Venue in Provo, Utah',
    description:
      'Floor-to-ceiling windows. The Wasatch mountains behind you. Starting at $300.',
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://valevenue.com'
  ),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-neutral-50 text-neutral-800">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
