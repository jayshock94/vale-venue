'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/Badge'

interface PricingPackage {
  id?: string
  name: string
  time_range: string
  hours: number
  price_mon_wed: number
  price_thursday: number
  price_fri_sat: number
  is_peak: boolean
  is_featured: boolean
  active: boolean
  sort_order: number
}

const defaultPackage: Omit<PricingPackage, 'id'> = {
  name: 'New Package',
  time_range: '9am – 5pm',
  hours: 8,
  price_mon_wed: 1000,
  price_thursday: 1200,
  price_fri_sat: 1500,
  is_peak: false,
  is_featured: false,
  active: true,
  sort_order: 99,
}

export default function PricingAdminPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('pricing_packages')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setPackages(data)
      })
  }, [])

  const updatePackage = (index: number, updates: Partial<PricingPackage>) => {
    setPackages((prev) =>
      prev.map((pkg, i) => (i === index ? { ...pkg, ...updates } : pkg))
    )
    setHasChanges(true)
    setSaved(false)
  }

  const addPackage = () => {
    setPackages((prev) => [...prev, { ...defaultPackage, sort_order: prev.length }])
    setHasChanges(true)
  }

  const removePackage = (index: number) => {
    if (!confirm('Remove this package?')) return
    setPackages((prev) => prev.filter((_, i) => i !== index))
    setHasChanges(true)
  }

  const saveAll = async () => {
    setSaving(true)
    const supabase = createClient()
    for (const pkg of packages) {
      if (pkg.id) {
        await supabase.from('pricing_packages').update(pkg).eq('id', pkg.id)
      } else {
        await supabase.from('pricing_packages').insert(pkg)
      }
    }
    setSaving(false)
    setSaved(true)
    setHasChanges(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputClass =
    'w-full bg-admin-page border border-admin-border rounded-sharp px-2 py-1.5 font-sans text-xs text-neutral-800 focus:outline-none focus:border-neutral-400'

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-sans font-medium text-xl text-neutral-800 mb-1">
            Pricing
          </h1>
          <p className="font-sans text-sm text-neutral-500">
            Edit packages inline. Toggle active/inactive.
          </p>
        </div>
        <button
          onClick={addPackage}
          className="font-sans font-semibold text-xs uppercase tracking-btn border border-neutral-300 text-neutral-600 rounded-sharp px-4 py-2 hover:border-neutral-800 hover:text-neutral-800 transition-colors"
        >
          + Add Package
        </button>
      </div>

      {hasChanges && (
        <div className="bg-amber-50 border border-amber-400 rounded-admin px-4 py-3 flex items-center justify-between mb-6">
          <p className="font-sans text-xs text-amber-800">Unsaved changes.</p>
          <button
            onClick={saveAll}
            disabled={saving}
            className="font-sans text-xs font-semibold bg-amber-400 text-amber-800 rounded-sharp px-3 py-1.5"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      )}

      {saved && (
        <div className="bg-sage-50 border border-sage-600 rounded-admin px-4 py-3 mb-6">
          <p className="font-sans text-xs text-sage-600">Saved.</p>
        </div>
      )}

      <div className="bg-white border border-admin-border rounded-admin overflow-hidden">
        <table className="w-full">
          <thead className="bg-admin-page border-b border-admin-border">
            <tr>
              {['Package name', 'Time range', 'Hrs', 'Mon–Wed', 'Thu', 'Fri–Sat', 'Peak', 'Featured', 'Active', ''].map((h) => (
                <th
                  key={h}
                  className="text-left font-sans font-medium text-2xs uppercase tracking-wider text-neutral-400 py-3 px-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-divider">
            {packages.map((pkg, index) => (
              <tr key={pkg.id || index} className={pkg.active ? '' : 'opacity-50'}>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => updatePackage(index, { name: e.target.value })}
                      className={inputClass}
                    />
                    {pkg.is_featured && <Badge variant="gold">Best</Badge>}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <input
                    type="text"
                    value={pkg.time_range}
                    onChange={(e) => updatePackage(index, { time_range: e.target.value })}
                    className={inputClass}
                  />
                </td>
                <td className="py-3 px-3">
                  <input
                    type="number"
                    value={pkg.hours}
                    onChange={(e) => updatePackage(index, { hours: Number(e.target.value) })}
                    className={`${inputClass} w-12`}
                  />
                </td>
                {(['price_mon_wed', 'price_thursday', 'price_fri_sat'] as const).map((field) => (
                  <td key={field} className="py-3 px-3">
                    <input
                      type="number"
                      value={pkg[field]}
                      onChange={(e) => updatePackage(index, { [field]: Number(e.target.value) })}
                      className={`${inputClass} w-20`}
                    />
                  </td>
                ))}
                <td className="py-3 px-3 text-center">
                  <input
                    type="checkbox"
                    checked={pkg.is_peak}
                    onChange={(e) => updatePackage(index, { is_peak: e.target.checked })}
                  />
                </td>
                <td className="py-3 px-3 text-center">
                  <input
                    type="checkbox"
                    checked={pkg.is_featured}
                    onChange={(e) => updatePackage(index, { is_featured: e.target.checked })}
                  />
                </td>
                <td className="py-3 px-3 text-center">
                  <input
                    type="checkbox"
                    checked={pkg.active}
                    onChange={(e) => updatePackage(index, { active: e.target.checked })}
                  />
                </td>
                <td className="py-3 px-3">
                  <button
                    onClick={() => removePackage(index)}
                    className="font-sans text-xs text-rust-600 hover:text-rust-800"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={saveAll}
          disabled={saving || !hasChanges}
          className="font-sans font-semibold text-xs uppercase tracking-btn bg-neutral-800 text-neutral-50 rounded-sharp px-6 py-3 hover:bg-neutral-700 transition-colors disabled:opacity-40"
        >
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
