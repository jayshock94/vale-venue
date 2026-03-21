'use client'

import { cn } from '@/lib/utils'
import React, { useState, useRef, useEffect } from 'react'

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

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
}

const labelClass =
  'block text-xs font-semibold font-sans uppercase tracking-label text-gold-600 mb-1'

// component.input from vale-design-system.json
// height-public=56px, padding=16px all sides, bg=raised(white), bottom-line style
const inputBase =
  'w-full h-[var(--input-height-public)] bg-neutral-0 border-b border-rule text-base font-regular font-sans text-neutral-800 placeholder-neutral-400 py-4 px-4 outline-none transition-all duration-default focus:border-b-2 focus:border-gold-400 focus:shadow-focus-gold'

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
          'resize-none min-h-[var(--input-textarea-min)] h-auto',
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

// component.select — custom dropdown panel, matches input bottom-border style
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  error,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find((o) => o.value === value)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [open])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { setOpen(false); return }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((p) => !p); return }
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = options.findIndex((o) => o.value === value)
      const next = options[idx + 1]
      if (next) onChange(next.value)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = options.findIndex((o) => o.value === value)
      const prev = options[idx - 1]
      if (prev) onChange(prev.value)
    }
  }

  return (
    <div ref={containerRef} className={cn('relative flex flex-col gap-0.5', className)}>
      {label && <label className={labelClass}>{label}</label>}

      {/* Trigger — same bottom-border style as Input */}
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        onKeyDown={handleKeyDown}
        onClick={() => setOpen((p) => !p)}
        className={cn(
          'w-full h-[var(--input-height-public)] bg-neutral-0 text-left',
          'flex items-center justify-between gap-2 px-4',
          'font-sans font-regular text-base outline-none',
          'border-b transition-all duration-default',
          open
            ? 'border-b-2 border-gold-400 shadow-focus-gold'
            : error
            ? 'border-rust-600'
            : 'border-rule',
          selectedOption ? 'text-neutral-800' : 'text-neutral-400'
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {/* Chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={cn(
            'flex-shrink-0 transition-transform duration-default',
            open ? 'rotate-180 text-gold-400' : 'text-neutral-400'
          )}
          aria-hidden="true"
        >
          <path
            d="M2.5 5l4.5 4.5L11.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-neutral-0 border border-rule rounded-soft overflow-hidden shadow-[var(--select-panel-shadow)]"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                onClick={() => { onChange(option.value); setOpen(false) }}
                className={cn(
                  'w-full text-left px-4 flex items-center h-12',
                  'font-sans text-base transition-colors duration-fast',
                  option.value === value
                    ? 'bg-gold-50 text-gold-600 font-medium'
                    : 'font-regular text-neutral-800 hover:bg-neutral-50'
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <span className="text-2xs text-rust-600 font-sans mt-1">{error}</span>
      )}
    </div>
  )
}
