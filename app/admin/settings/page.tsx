'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface PanelProps {
  title: string
  children: React.ReactNode
}

function Panel({ title, children }: PanelProps) {
  return (
    <div className="bg-white border border-admin-border rounded-admin p-6 mb-6">
      <h3 className="font-sans font-medium text-sm text-neutral-800 mb-4 pb-3 border-b border-admin-border">
        {title}
      </h3>
      {children}
    </div>
  )
}

const inputClass =
  'w-full bg-admin-page border border-admin-border rounded-admin px-3 py-2 font-sans text-sm text-neutral-800 focus:outline-none focus:border-neutral-400'
const labelClass =
  'block font-sans font-semibold text-xs uppercase tracking-label text-neutral-400 mb-1'

export default function SettingsPage() {
  const [contactInfo, setContactInfo] = useState({
    address: '1078 South 250 East, Provo, Utah',
    phone: '801-592-6287',
    email: 'bobbi@valevenue.com',
    hours: 'Monday through Saturday, by appointment',
  })
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState('')
  const [contactSaved, setContactSaved] = useState(false)

  const saveContactInfo = async () => {
    setSaving(true)
    const supabase = createClient()
    for (const [key, value] of Object.entries(contactInfo)) {
      await supabase.from('admin_settings').upsert(
        { key: `contact_${key}`, value },
        { onConflict: 'key' }
      )
    }
    setSaving(false)
    setContactSaved(true)
    setTimeout(() => setContactSaved(false), 2000)
  }

  const changePassword = async () => {
    if (password.new !== password.confirm) {
      setPasswordMsg('Passwords do not match.')
      return
    }
    if (password.new.length < 8) {
      setPasswordMsg('Password must be at least 8 characters.')
      return
    }
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: password.new })
    if (error) {
      setPasswordMsg('Failed to update password.')
    } else {
      setPasswordMsg('Password updated.')
      setPassword({ current: '', new: '', confirm: '' })
    }
    setTimeout(() => setPasswordMsg(''), 3000)
  }

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="font-sans font-medium text-xl text-neutral-800 mb-1">
          Settings
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Site and account settings.
        </p>
      </div>

      <Panel title="Contact Information">
        <div className="flex flex-col gap-4">
          {(Object.keys(contactInfo) as Array<keyof typeof contactInfo>).map((field) => (
            <div key={field}>
              <label className={labelClass}>{field}</label>
              <input
                type="text"
                className={inputClass}
                value={contactInfo[field]}
                onChange={(e) =>
                  setContactInfo((prev) => ({ ...prev, [field]: e.target.value }))
                }
              />
            </div>
          ))}
          {contactSaved && (
            <p className="font-sans text-xs text-sage-600">Saved.</p>
          )}
          <button
            onClick={saveContactInfo}
            disabled={saving}
            className="font-sans font-semibold text-xs uppercase tracking-btn bg-neutral-800 text-neutral-50 rounded-sharp px-5 py-2.5 hover:bg-neutral-700 transition-colors self-start"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </Panel>

      <Panel title="Change Password">
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>New password</label>
            <input
              type="password"
              className={inputClass}
              value={password.new}
              onChange={(e) => setPassword((p) => ({ ...p, new: e.target.value }))}
              placeholder="Minimum 8 characters"
            />
          </div>
          <div>
            <label className={labelClass}>Confirm password</label>
            <input
              type="password"
              className={inputClass}
              value={password.confirm}
              onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))}
            />
          </div>
          {passwordMsg && (
            <p className={`font-sans text-xs ${passwordMsg.includes('updated') ? 'text-sage-600' : 'text-rust-600'}`}>
              {passwordMsg}
            </p>
          )}
          <button
            onClick={changePassword}
            className="font-sans font-semibold text-xs uppercase tracking-btn bg-neutral-800 text-neutral-50 rounded-sharp px-5 py-2.5 hover:bg-neutral-700 transition-colors self-start"
          >
            Update Password
          </button>
        </div>
      </Panel>

      <Panel title="About">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="font-sans text-xs text-neutral-400 uppercase tracking-label">Venue</span>
            <span className="font-sans text-xs text-neutral-800">The Vale at Ten Seventy-Eight</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-neutral-400 uppercase tracking-label">Location</span>
            <span className="font-sans text-xs text-neutral-800">Provo, Utah</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-neutral-400 uppercase tracking-label">Version</span>
            <span className="font-sans text-xs text-neutral-800">1.0.0</span>
          </div>
        </div>
      </Panel>
    </div>
  )
}
