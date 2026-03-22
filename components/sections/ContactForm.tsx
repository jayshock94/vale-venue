'use client'

import { useState } from 'react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { submitInquiry } from '@/app/actions/submitInquiry'
import { cn } from '@/lib/utils'

interface FormData {
  full_name: string
  email: string
  event_type: string
  guest_count: string
  desired_date: string
  message: string
}

interface FormErrors {
  full_name?: string
  email?: string
  event_type?: string
  guest_count?: string
  desired_date?: string
  message?: string
}

// Format YYYY-MM-DD → "March 21, 2026"
function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

// Step indicator — numbered circles, no labels
function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-5 h-5 rounded-full bg-gold-400 flex items-center justify-center flex-shrink-0">
        <span className="font-sans font-semibold text-xs text-neutral-800">1</span>
      </div>
      <div
        className={cn(
          'h-px w-8 transition-colors duration-default',
          step === 2 ? 'bg-gold-400' : 'bg-neutral-200'
        )}
      />
      <div
        className={cn(
          'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors duration-default',
          step === 2
            ? 'bg-gold-400 border-gold-400'
            : 'bg-transparent border-neutral-300'
        )}
      >
        <span
          className={cn(
            'font-sans font-semibold text-xs transition-colors duration-default',
            step === 2 ? 'text-neutral-800' : 'text-neutral-400'
          )}
        >
          2
        </span>
      </div>
    </div>
  )
}

// Success state — peak-end rule: make the final moment feel great
function SuccessView({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-4">

      {/* Animated check circle — the peak moment */}
      <div
        className="w-16 h-16 rounded-full bg-gold-400 flex items-center justify-center mb-6"
        style={{ animation: 'vale-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path
            d="M5 13L10 18L21 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="24"
            style={{
              strokeDashoffset: 24,
              animation: 'vale-check-draw 0.32s ease forwards 0.38s',
            }}
          />
        </svg>
      </div>

      {/* Headline — warm and direct */}
      <div
        style={{ opacity: 0, animation: 'vale-fade-up 0.4s ease 0.52s forwards' }}
        className="mb-7"
      >
        <p className="font-sans font-medium text-xs uppercase tracking-label text-gold-600 mb-2">
          Inquiry received
        </p>
        <h3 className="font-serif font-bold text-3xl text-neutral-800 tracking-tightest mb-3">
          You&apos;re all set.
        </h3>
        <p className="font-sans font-regular text-sm text-neutral-500 leading-relaxed max-w-[230px] mx-auto">
          Bobbi reads every inquiry personally and will be in touch within one business day.
        </p>
      </div>

      {/* Divider */}
      <div
        className="w-full border-t border-rule mb-6"
        style={{ opacity: 0, animation: 'vale-fade-up 0.3s ease 0.68s forwards' }}
      />

      {/* Next steps */}
      <div
        className="w-full flex flex-col gap-4 text-left mb-8"
        style={{ opacity: 0, animation: 'vale-fade-up 0.4s ease 0.76s forwards' }}
      >
        {[
          'Bobbi reads your inquiry',
          'Hear back within one business day',
          'Schedule your venue tour',
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-gold-100 font-sans font-semibold text-xs text-gold-700 flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="font-sans font-regular text-sm text-neutral-600">{item}</span>
          </div>
        ))}
      </div>

      {/* Submit new request */}
      <div
        className="w-full"
        style={{ opacity: 0, animation: 'vale-fade-up 0.4s ease 0.92s forwards' }}
      >
        <button
          onClick={onReset}
          className="w-full h-12 rounded-sharp border border-rule font-sans font-medium text-xs uppercase tracking-btn text-neutral-500 hover:text-neutral-800 hover:border-neutral-400 transition-colors duration-[var(--transition-fast)]"
        >
          Submit new request
        </button>
      </div>
    </div>
  )
}

export default function ContactForm({ defaultDate, defaultEndDate }: { defaultDate?: string; defaultEndDate?: string }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    event_type: '',
    guest_count: '',
    desired_date: defaultDate ?? '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.full_name.trim()) newErrors.full_name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address'
    if (!formData.event_type) newErrors.event_type = 'Select an event type'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setErrors({})
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.full_name.toLowerCase() === 'test') {
      setSubmitted(true)
      return
    }
    setSubmitting(true)
    setServerError('')
    try {
      const result = await submitInquiry(formData)
      if (result.success) {
        setSubmitted(true)
      } else {
        setServerError(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setServerError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setStep(1)
    setFormData({
      full_name: '',
      email: '',
      event_type: '',
      guest_count: '',
      desired_date: defaultDate ?? '',
      message: '',
    })
    setErrors({})
    setServerError('')
  }

  // Date confirmation notice — only shown on step 1 when dates came from the calendar
  const dateNotice = defaultDate ? (
    <div className="flex items-center gap-2 mb-6 px-3 py-2.5 bg-gold-50 border border-gold-100 rounded-sharp">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 text-gold-600" aria-hidden="true">
        <rect x="1" y="2.5" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.25" />
        <path d="M1 6h12M4.5 1v2.5M9.5 1v2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
      <p className="font-sans text-xs text-gold-700 leading-snug">
        {defaultEndDate
          ? <><span className="font-medium">{formatDate(defaultDate)}</span> — <span className="font-medium">{formatDate(defaultEndDate)}</span> pre-filled on next step</>
          : <><span className="font-medium">{formatDate(defaultDate)}</span> pre-filled on next step</>
        }
      </p>
    </div>
  ) : null

  if (submitted) {
    return <SuccessView onReset={handleReset} />
  }

  return (
    <div>
      <StepIndicator step={step} />

      {step === 1 ? (
        <div className="flex flex-col gap-8">
          {dateNotice}
          <Input
            label="Full name"
            type="text"
            placeholder="Your name"
            value={formData.full_name}
            onChange={(e) => handleChange('full_name', e.target.value)}
            error={errors.full_name}
            autoComplete="name"
          />
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            autoComplete="email"
          />
          <Select
            label="Event type"
            value={formData.event_type}
            onChange={(val) => handleChange('event_type', val)}
            placeholder="Select event type"
            error={errors.event_type}
            options={[
              { value: 'Wedding', label: 'Wedding' },
              { value: 'Corporate', label: 'Corporate' },
              { value: 'Private Celebration', label: 'Private Celebration' },
              { value: 'Other', label: 'Other' },
            ]}
          />
          <Button type="button" variant="gold" size="lg" onClick={handleNext}>
            Continue
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <Select
            label="Estimated guest count"
            value={formData.guest_count}
            onChange={(val) => handleChange('guest_count', val)}
            placeholder="How many guests?"
            error={errors.guest_count}
            options={[
              { value: 'Under 25', label: 'Under 25' },
              { value: '25–50', label: '25–50' },
              { value: '51–75', label: '51–75' },
              { value: '76–100', label: '76–100' },
            ]}
          />
          <Input
            label="Desired date"
            type="date"
            value={formData.desired_date}
            onChange={(e) => handleChange('desired_date', e.target.value)}
            error={errors.desired_date}
          />
          <Textarea
            label="Tell us more"
            placeholder="Guest count, questions, or anything Bobbi should know."
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            error={errors.message}
          />

          {serverError && (
            <p className="font-sans text-sm text-rust-600">{serverError}</p>
          )}

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={submitting}
              className={submitting ? 'opacity-60 cursor-not-allowed' : ''}
            >
              {submitting ? 'Sending…' : 'Send Inquiry'}
            </Button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="font-sans text-sm text-neutral-400 hover:text-neutral-600 transition-colors text-center"
            >
              ← Back
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
