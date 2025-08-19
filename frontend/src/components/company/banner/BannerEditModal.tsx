import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { IoCloudUpload, IoImage, IoTrash } from "react-icons/io5"
import Modal from "@/components/modal"
import { useCompanyStore } from "@/stores/company-store"

interface Props {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

interface FormData {
  banner: FileList
}

// Mock data for previous images
const mockPreviousImages = [
  "/api/mock/banner1.jpg",
  "/api/mock/banner2.jpg",
  "/api/mock/banner3.jpg",
  "/api/mock/banner4.jpg",
]

export default function BannerEditModal({ isOpen, setOpen }: Props) {
  const company = useCompanyStore()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const selectedFile = watch("banner")?.[0]

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const handleUpload = async (data: FormData) => {
    setIsUploading(true)

    // Mock upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful upload
    console.log("Uploading banner:", data.banner[0])

    // Here you would typically:
    // 1. Upload the file to your server
    // 2. Update the company banner URL
    // 3. Update the company store

    setIsUploading(false)
    setOpen(false)
  }

  const handlePreviousImageSelect = async (imageUrl: string) => {
    setIsUploading(true)

    // Mock selection delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful selection
    console.log("Selected previous image:", imageUrl)

    // Here you would typically:
    // 1. Update the company banner URL
    // 2. Update the company store

    setIsUploading(false)
    setOpen(false)
  }

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title="Edit Company Banner">
      <div className="space-y-6">
        {/* Upload New Image Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Upload New Banner</h3>

          <form onSubmit={handleSubmit(handleUpload)} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Choose Image File</label>
              <div className="flex w-full items-center justify-center">
                <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IoCloudUpload className="mb-2 h-8 w-8 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register("banner", { required: "Please select an image" })}
                  />
                </label>
              </div>
              {errors.banner && <p className="text-sm text-red-600">{errors.banner.message}</p>}
            </div>

            {/* Preview selected image */}
            {selectedFile && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Preview</label>
                <div className="relative h-32 w-full overflow-hidden rounded-lg border border-gray-300">
                  <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="h-full w-full object-cover" />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload Banner"}
              </button>
            </div>
          </form>
        </div>

        {/* Previous Images Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Previous Banners</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {mockPreviousImages.map((imageUrl, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                onClick={() => handlePreviousImageSelect(imageUrl)}
              >
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
                  <div className="flex h-full w-full items-center justify-center">
                    <IoImage className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">Select</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
