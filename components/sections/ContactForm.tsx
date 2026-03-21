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

// Two-dot progress indicator — gold when active, neutral when pending
function ProgressDots({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="w-2 h-2 rounded-full bg-gold-400" />
      <div
        className={cn(
          'h-px w-5 transition-colors duration-default',
          step === 2 ? 'bg-gold-400' : 'bg-neutral-300'
        )}
      />
      <div
        className={cn(
          'w-2 h-2 rounded-full transition-colors duration-default',
          step === 2 ? 'bg-gold-400' : 'bg-neutral-300'
        )}
      />
      <span className="font-sans text-xs text-neutral-400 ml-1">
        {step === 1 ? 'About you' : 'About your event'}
      </span>
    </div>
  )
}

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    event_type: '',
    guest_count: '',
    desired_date: '',
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

  if (submitted) {
    return (
      <div className="py-12">
        <p className="font-sans font-medium text-xs uppercase tracking-label text-gold-600 mb-3">
          Inquiry received
        </p>
        <h3 className="font-serif text-3xl text-neutral-800 tracking-tightest mb-8">
          We got it.
        </h3>
        <div className="flex flex-col gap-5">
          {[
            'Bobbi reads your inquiry',
            'You hear back within one business day',
            'Schedule your tour',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-gold-400 font-sans font-semibold text-xs text-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="font-sans font-light text-base text-neutral-600">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <ProgressDots step={step} />

      {step === 1 ? (
        <div className="flex flex-col gap-8">
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
            onChange={(e) => handleChange('event_type', e.target.value)}
            error={errors.event_type}
          >
            <option value="">Select event type</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate">Corporate</option>
            <option value="Private Celebration">Private Celebration</option>
            <option value="Other">Other</option>
          </Select>
          <Button type="button" variant="gold" size="lg" onClick={handleNext}>
            Continue
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <Select
            label="Estimated guest count"
            value={formData.guest_count}
            onChange={(e) => handleChange('guest_count', e.target.value)}
            error={errors.guest_count}
          >
            <option value="">How many guests?</option>
            <option value="Under 25">Under 25</option>
            <option value="25–50">25–50</option>
            <option value="51–75">51–75</option>
            <option value="76–100">76–100</option>
          </Select>
          <Input
            label="Desired date"
            type="date"
            value={formData.desired_date}
            onChange={(e) => handleChange('desired_date', e.target.value)}
            error={errors.desired_date}
          />
          <Textarea
            label="Anything else?"
            placeholder="Your vision, questions, or anything Bobbi should know."
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
