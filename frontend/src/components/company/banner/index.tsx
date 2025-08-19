import React, { useState } from "react"
import { useCompanyStore } from "@/stores/company-store"
import { IoPencil } from "react-icons/io5"
import Modal from "@/components/modal"
import BannerEditModal from "./BannerEditModal"

interface Props {
  edit_mode?: boolean
}

export default function CompanyBanner({ edit_mode }: Props) {
  const company = useCompanyStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const imageSrc = `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.company?.banner}`

  const handleEditClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div
        className={`relative flex h-[200px] w-full items-center justify-start bg-gray-100 bg-cover bg-center bg-no-repeat pl-2 lg:rounded-b-md ${
          edit_mode ? "group cursor-pointer" : ""
        }`}
        style={{ backgroundImage: `url(${imageSrc})` }}
        onClick={edit_mode ? handleEditClick : undefined}
      >
        {edit_mode && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2">
              <IoPencil className="text-gray-700" size={20} />
              <span className="text-sm font-medium text-gray-700">Edit Banner</span>
            </div>
          </div>
        )}
      </div>

      <BannerEditModal isOpen={isModalOpen} setOpen={setIsModalOpen} />
    </>
  )
}
