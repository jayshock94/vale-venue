'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

interface GalleryImage {
  id: string
  storage_path: string
  public_url: string
  caption?: string
  category?: string
  sort_order?: number
  is_featured?: boolean
  active?: boolean
}

const CATEGORY_OPTIONS = ['All', 'weddings', 'corporate', 'celebrations']

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order')
    if (data) setImages(data)
    setLoading(false)
  }

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    const supabase = createClient()

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(path, file)

      if (uploadError) continue

      const { data: urlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(path)

      await supabase.from('gallery_images').insert({
        storage_path: path,
        public_url: urlData.publicUrl,
        caption: '',
        category: 'weddings',
        sort_order: images.length,
        is_featured: images.length === 0,
        active: true,
      })
    }

    await fetchImages()
    setUploading(false)
  }

  const updateImage = async (id: string, updates: Partial<GalleryImage>) => {
    const supabase = createClient()
    await supabase.from('gallery_images').update(updates).eq('id', id)
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
    )
  }

  const removeImage = async (id: string, storagePath: string) => {
    if (!confirm('Remove this image?')) return
    const supabase = createClient()
    await supabase.storage.from('gallery').remove([storagePath])
    await supabase.from('gallery_images').delete().eq('id', id)
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-sans font-medium text-xl text-neutral-800 mb-1">
          Gallery
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Upload and manage venue photos.
        </p>
      </div>

      {/* Upload area */}
      <div
        className="bg-white border-2 border-dashed border-admin-border rounded-admin p-10 text-center mb-8 hover:border-neutral-400 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleUpload(e.dataTransfer.files)
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <p className="font-sans font-medium text-sm text-neutral-500 mb-1">
          {uploading ? 'Uploading…' : 'Drop photos here or click to upload'}
        </p>
        <p className="font-sans text-xs text-neutral-400">
          JPG, PNG, WebP. Multiple files supported.
        </p>
      </div>

      {/* Image grid */}
      {loading ? (
        <p className="font-sans text-sm text-neutral-400">Loading…</p>
      ) : images.length === 0 ? (
        <p className="font-sans text-sm text-neutral-400">No photos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              className={`bg-white border rounded-admin overflow-hidden ${
                index === 0 ? 'border-gold-400' : 'border-admin-border'
              }`}
            >
              <div className="relative aspect-video bg-neutral-100">
                <Image
                  src={img.public_url}
                  alt={img.caption || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {index === 0 && (
                  <span className="absolute top-2 left-2 bg-gold-400 text-neutral-800 font-sans text-2xs font-semibold uppercase tracking-label px-2 py-0.5 rounded-sharp">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-3 flex flex-col gap-2">
                <input
                  type="text"
                  value={img.caption || ''}
                  onChange={(e) => updateImage(img.id, { caption: e.target.value })}
                  placeholder="Caption"
                  className="w-full font-sans text-xs bg-admin-page border border-admin-border rounded-sharp px-2 py-1 focus:outline-none focus:border-neutral-400"
                />
                <select
                  value={img.category || 'weddings'}
                  onChange={(e) => updateImage(img.id, { category: e.target.value })}
                  className="w-full font-sans text-xs bg-admin-page border border-admin-border rounded-sharp px-2 py-1 focus:outline-none"
                >
                  {CATEGORY_OPTIONS.slice(1).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <button
                  onClick={() => removeImage(img.id, img.storage_path)}
                  className="font-sans text-2xs text-rust-600 hover:text-rust-800 transition-colors text-left uppercase tracking-label"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
