import React, { useState } from "react"
import { UseFormRegister } from "react-hook-form"
import Image from "next/image"

interface Props {
  id: string
  label?: string
  register: UseFormRegister<any>
  error?: string
  currentImageUrl?: string
  accept?: string
}

export default function FileField({ id, label, register, error, currentImageUrl, accept = "image/*" }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="block pl-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Current image preview */}
      {(currentImageUrl || previewUrl) && (
        <div className="mb-2">
          <p className="mb-1 text-sm text-gray-600">Current image:</p>
          <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-300">
            <Image
              src={previewUrl || `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${currentImageUrl}`}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* File input */}
      <input
        id={id}
        type="file"
        accept={accept}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
        {...register(id)}
        onChange={handleFileChange}
      />
      {error && <small className="mt-1 text-red-500">{error}</small>}
    </div>
  )
}
