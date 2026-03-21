'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ContentItem {
  id?: string
  section: string
  key: string
  value: string
}

const defaultContent: ContentItem[] = [
  { section: 'hero', key: 'headline', value: 'Clean lines. Mountain backdrop. Everything else is yours.' },
  { section: 'hero', key: 'sub_copy', value: 'Floor-to-ceiling windows. A modern building set against the Wasatch mountains.' },
  { section: 'stats', key: 'events_hosted', value: '100+' },
  { section: 'stats', key: 'average_review', value: '5 Star' },
  { section: 'stats', key: 'guest_capacity', value: '100' },
  { section: 'stats', key: 'starting_price', value: '$300' },
]

interface PanelProps {
  title: string
  children: React.ReactNode
}

function Panel({ title, children }: PanelProps) {
  return (
    <div className="bg-white border border-admin-border rounded-admin p-6 mb-4">
      <h3 className="font-sans font-medium text-sm text-neutral-800 mb-4 pb-3 border-b border-admin-border">
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>(defaultContent)
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('site_content')
      .select('*')
      .then(({ data }) => {
        if (data && data.length > 0) setContent(data)
      })
  }, [])

  const updateField = (section: string, key: string, value: string) => {
    setContent((prev) =>
      prev.map((item) =>
        item.section === section && item.key === key ? { ...item, value } : item
      )
    )
    setHasChanges(true)
    setSaved(false)
  }

  const getField = (section: string, key: string) =>
    content.find((c) => c.section === section && c.key === key)?.value ?? ''

  const saveAll = async () => {
    setSaving(true)
    const supabase = createClient()
    for (const item of content) {
      await supabase.from('site_content').upsert(
        { section: item.section, key: item.key, value: item.value },
        { onConflict: 'section,key' }
      )
    }
    setSaving(false)
    setSaved(true)
    setHasChanges(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputClass =
    'w-full bg-admin-page border border-admin-border rounded-admin px-3 py-2 font-sans text-sm text-neutral-800 focus:outline-none focus:border-neutral-400'
  const labelClass =
    'block font-sans font-semibold text-xs uppercase tracking-label text-neutral-400 mb-1'

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-sans font-medium text-xl text-neutral-800 mb-1">
            Content
          </h1>
          <p className="font-sans text-sm text-neutral-500">
            Edit site copy. Changes save to the database.
          </p>
        </div>
      </div>

      {/* Unsaved banner */}
      {hasChanges && (
        <div className="bg-amber-50 border border-amber-400 rounded-admin px-4 py-3 flex items-center justify-between mb-6">
          <p className="font-sans text-xs text-amber-800">You have unsaved changes.</p>
          <div className="flex gap-2">
            <button
              onClick={() => { setContent(defaultContent); setHasChanges(false) }}
              className="font-sans text-xs text-amber-800 hover:text-amber-900 border border-amber-400 rounded-sharp px-3 py-1.5"
            >
              Discard
            </button>
            <button
              onClick={saveAll}
              disabled={saving}
              className="font-sans text-xs font-semibold bg-amber-400 text-amber-800 rounded-sharp px-3 py-1.5 hover:bg-amber-500 transition-colors"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {saved && (
        <div className="bg-sage-50 border border-sage-600 rounded-admin px-4 py-3 mb-6">
          <p className="font-sans text-xs text-sage-600">Changes saved.</p>
        </div>
      )}

      <Panel title="Hero">
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Headline</label>
            <textarea
              className={`${inputClass} resize-none h-20`}
              value={getField('hero', 'headline')}
              onChange={(e) => updateField('hero', 'headline', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Sub-copy</label>
            <textarea
              className={`${inputClass} resize-none h-20`}
              value={getField('hero', 'sub_copy')}
              onChange={(e) => updateField('hero', 'sub_copy', e.target.value)}
            />
          </div>
        </div>
      </Panel>

      <Panel title="Stats Bar">
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'events_hosted', label: 'Events Hosted' },
            { key: 'average_review', label: 'Average Review' },
            { key: 'guest_capacity', label: 'Guest Capacity' },
            { key: 'starting_price', label: 'Starting Price' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <input
                type="text"
                className={inputClass}
                value={getField('stats', key)}
                onChange={(e) => updateField('stats', key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Weddings Card">
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Body copy</label>
            <textarea
              className={`${inputClass} resize-none h-24`}
              value={getField('events', 'weddings_body')}
              onChange={(e) => updateField('events', 'weddings_body', e.target.value)}
              placeholder="Dedicated bride and groom suites on-site…"
            />
          </div>
        </div>
      </Panel>

      <Panel title="Corporate Card">
        <div>
          <label className={labelClass}>Body copy</label>
          <textarea
            className={`${inputClass} resize-none h-24`}
            value={getField('events', 'corporate_body')}
            onChange={(e) => updateField('events', 'corporate_body', e.target.value)}
            placeholder="Clean, modern space with full AV…"
          />
        </div>
      </Panel>

      <Panel title="Celebrations Card">
        <div>
          <label className={labelClass}>Body copy</label>
          <textarea
            className={`${inputClass} resize-none h-24`}
            value={getField('events', 'celebrations_body')}
            onChange={(e) => updateField('events', 'celebrations_body', e.target.value)}
            placeholder="Every milestone deserves a space…"
          />
        </div>
      </Panel>

      <div className="mt-6">
        <button
          onClick={saveAll}
          disabled={saving || !hasChanges}
          className="font-sans font-semibold text-xs uppercase tracking-btn bg-neutral-800 text-neutral-50 rounded-sharp px-6 py-3 hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
