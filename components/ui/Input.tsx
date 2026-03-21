'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  className?: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  className?: string
  children: React.ReactNode
}

const labelClass =
  'block text-xs font-semibold font-sans uppercase tracking-label text-gold-600 mb-1'

const inputBase =
  'w-full bg-white border-b border-rule text-base font-light font-sans text-neutral-800 placeholder-neutral-300 py-2 px-0 outline-none transition-all duration-default focus:border-b-2 focus:border-gold-400 focus:shadow-focus-gold'

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && <label className={labelClass}>{label}</label>}
      <input
        className={cn(
          inputBase,
          error ? 'border-rust-600 focus:border-rust-600' : '',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-2xs text-rust-600 font-sans mt-1">{error}</span>
      )}
    </div>
  )
}

export function Textarea({
  label,
  error,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && <label className={labelClass}>{label}</label>}
      <textarea
        className={cn(
          inputBase,
          'resize-none min-h-[120px]',
          error ? 'border-rust-600 focus:border-rust-600' : '',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-2xs text-rust-600 font-sans mt-1">{error}</span>
      )}
    </div>
  )
}

export function Select({ label, error, className, children, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && <label className={labelClass}>{label}</label>}
      <select
        className={cn(
          inputBase,
          'cursor-pointer appearance-none',
          error ? 'border-rust-600 focus:border-rust-600' : '',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <span className="text-2xs text-rust-600 font-sans mt-1">{error}</span>
      )}
    </div>
  )
}
