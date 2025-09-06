import { CompanyType } from "@/types"
import Image from "next/image"
import React from "react"

export default function ProfileMiniature({ company }: { company: CompanyType }) {
  return (
    <div className="absolute top-0 left-0 m-2 flex h-[70px] w-[300px] items-center gap-4 rounded-lg bg-white px-2 shadow-lg">
      <Image
        src={`${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.image}`}
        alt={company.name}
        width={50}
        height={50}
        className="rounded-full border border-gray-200 bg-white"
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-bold">{company.name}</p>
        <p className="text-xs text-gray-500">{company.address}</p>
      </div>
    </div>
  )
}
