'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface Faq {
  id?: string
  question: string
  answer: string
  sort_order?: number
}

const defaultFaqs: Faq[] = [
  {
    question: 'Is catering included?',
    answer:
      'No — we provide the kitchen and food prep area. You bring your own caterer or handle food yourselves. We don\'t restrict who you work with.',
  },
  {
    question: 'How many guests can the venue hold?',
    answer:
      'Up to 100 guests comfortably. For ceremonies with chairs and a full reception setup, we recommend planning for 80–90 guests.',
  },
  {
    question: 'Can we do both the ceremony and reception here?',
    answer:
      'Yes — for non-LDS events, the ceremony and reception can both happen here with no venue change. For LDS couples, the temple ceremony is separate; we\'re three miles from the Provo Temple and set up specifically for receptions.',
  },
  {
    question: 'Is parking on-site?',
    answer: 'Yes. Parking for 40+ vehicles on-site, included in every package.',
  },
  {
    question: 'What AV equipment is available?',
    answer:
      'Full AV setup included — projector, screen, speakers, and microphone. Ideal for presentations, ceremonies, and receptions.',
  },
  {
    question: 'Can we bring our own alcohol?',
    answer:
      'You can arrange licensed bartending services. Alcohol policies follow Utah state law — you\'ll need a licensed bartender or caterer to serve.',
  },
  {
    question: 'How far in advance should we book?',
    answer:
      'Weekends book out 3–6 months in advance. Weekday availability is more flexible. Check the calendar or reach out to Bobbi directly.',
  },
]

interface FaqAccordionProps {
  faqs?: Faq[]
}

export default function FaqAccordion({ faqs = defaultFaqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = faqs.length > 0 ? faqs : defaultFaqs

  return (
    <div className="divide-y divide-rule">
      {items.map((faq, index) => (
        <div key={faq.id || index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="font-sans font-medium text-base text-neutral-800 pr-4">
              {faq.question}
            </span>
            <span
              className={cn(
                'text-neutral-400 group-hover:text-neutral-800 transition-all flex-shrink-0',
                openIndex === index ? 'rotate-180' : 'rotate-0'
              )}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="stroke-current"
              >
                <path
                  d="M3 6l5 5 5-5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          {openIndex === index && (
            <div className="pb-5">
              <p className="font-sans font-light text-base text-neutral-500 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
