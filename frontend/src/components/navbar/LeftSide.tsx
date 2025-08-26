import React, { useRef } from "react"
import MobileMenu from "./MobileMenu"
import Image from "next/image"
import { CompanyType } from "@/types"
import { HeaderMenu } from "./navbar"
import { FaEdit } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { useCompanyStore } from "@/stores/company-store"

interface Props {
  menus?: HeaderMenu[]
  company: CompanyType | null
  editMode?: boolean
}
export default function LeftSide({ menus, company, editMode = false }: Props) {
  const imageSrc = `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company?.image_url}`
  const imageInputRef = useRef<HTMLInputElement>(null)
  const { update } = useCompanyStore()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log(file)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <MobileMenu menus={menus} />
      <div className="relative flex items-center gap-2">
        <div
          className={cn(
            "absolute top-0 left-0 z-10 flex h-full w-[50px] cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-all duration-300 hover:opacity-100",
            !editMode && "hidden",
          )}
        >
          <FaEdit className="h-4 w-4 text-gray-400" onClick={() => imageInputRef.current?.click()} />
          <input ref={imageInputRef} type="file" className="hidden" onChange={handleImageChange} />
        </div>
        <a href="/" className={cn("text-primary hover:text-primary/90", editMode && "pointer-events-none")}>
          {company?.image_url && <Image src={imageSrc} width={50} height={50} alt={`${company.name} logo`} />}
        </a>
        <p className="text-sm font-bold">{company?.name}</p>
      </div>
    </div>
  )
}
