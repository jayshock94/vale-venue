'use client'

import { useState } from 'react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { submitInquiry } from '@/app/actions/submitInquiry'

interface FormData {
  full_name: string
  email: string
  event_type: string
  desired_date: string
  message: string
}

interface FormErrors {
  full_name?: string
  email?: string
  event_type?: string
  desired_date?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    event_type: '',
    desired_date: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.full_name.trim()) newErrors.full_name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address'
    if (!formData.event_type) newErrors.event_type = 'Select an event type'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
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
      <div className="py-12 text-center md:text-left">
        <p className="font-sans font-medium text-xs uppercase tracking-label text-gold-600 mb-3">
          Inquiry received
        </p>
        <h3 className="font-serif text-3xl text-neutral-800 tracking-tightest mb-4">
          We got it.
        </h3>
        <p className="font-sans font-light text-md text-neutral-500">
          Bobbi will respond within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
      <Input
        label="Desired date"
        type="date"
        value={formData.desired_date}
        onChange={(e) => handleChange('desired_date', e.target.value)}
        error={errors.desired_date}
      />
      <Textarea
        label="Tell us more"
        placeholder="Guest count, vision, anything else we should know."
        value={formData.message}
        onChange={(e) => handleChange('message', e.target.value)}
        error={errors.message}
      />

      {serverError && (
        <p className="font-sans text-sm text-rust-600">{serverError}</p>
      )}

      <Button
        type="submit"
        variant="gold"
        size="lg"
        disabled={submitting}
        className={submitting ? 'opacity-60 cursor-not-allowed' : ''}
      >
        {submitting ? 'Sending…' : 'Send Inquiry'}
      </Button>
    </form>
  )
}
