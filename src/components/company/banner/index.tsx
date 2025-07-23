import React from "react"
import { useCompanyStore } from "@/stores/company-store"
export default function CompanyBanner() {
  const company = useCompanyStore()
  const imageSrc = `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.company?.banner}`

  return (
    <div
      className="flex h-[200px] w-full items-center justify-start bg-gray-100 bg-cover bg-center bg-no-repeat pl-2 lg:rounded-b-md"
      style={{ backgroundImage: `url(${imageSrc})` }}
    />
  )
}
