import React from "react"
import MobileMenu from "./MobileMenu"
import Image from "next/image"
import { CompanyType } from "@/types"
import { HeaderMenu } from "./navbar"

interface Props {
  menus?: HeaderMenu[]
  company: CompanyType | null
}
export default function LeftSide({ menus, company }: Props) {
  const imageSrc = `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company?.image_url}`

  return (
    <div className="flex items-center gap-2">
      <MobileMenu menus={menus} />
      <div className="flex items-center gap-2">
        <a href="/" className="text-primary hover:text-primary/90">
          {company?.image_url && <Image src={imageSrc} width={50} height={50} alt={`${company.name} logo`} />}
        </a>
        <p className="text-sm font-bold">{company?.name}</p>
      </div>
    </div>
  )
}
