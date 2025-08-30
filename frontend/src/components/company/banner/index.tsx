import { uploadImage } from "@/services/company"
import { useCompanyStore } from "@/stores/company-store"
import { CompanyType } from "@/types"
import { useRef, useState } from "react"
import { IoPencil } from "react-icons/io5"
import { toast } from "react-toastify"

interface Props {
  edit_mode?: boolean
}

export default function CompanyBanner({ edit_mode }: Props) {
  const { company, update } = useCompanyStore()
  const imageSrc = `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company?.banner}`
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadImage(file, "company_banners")
        .then((res) => {
          update({ ...company, banner: res.url } as CompanyType)
        })
        .catch((err) => {
          console.log(err)
          toast.error("Failed to upload image")
        })
    }
  }

  return (
    <>
      <div
        className={`relative flex h-[200px] w-full items-center justify-start bg-gray-100 bg-cover bg-center bg-no-repeat pl-2 lg:rounded-b-md ${
          edit_mode ? "group cursor-pointer" : ""
        }`}
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        {edit_mode && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2">
              <IoPencil className="text-gray-700" size={20} />
              <span className="text-sm font-medium text-gray-700">Edit Banner</span>
            </div>
          </div>
        )}
      </div>
      <input accept="jpg,jpeg,png" ref={imageInputRef} type="file" className="hidden" onChange={handleImageChange} />
    </>
  )
}
