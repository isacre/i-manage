"use client"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import ButtonComponent from "../formFields/button"
import { useRouter } from "next/navigation"
import { useCompanyStore } from "@/stores/company-store"

export default function UnauthenticatedHeader() {
  const locale = useLocale()
  const t = useTranslations("Header")
  const router = useRouter()
  const { company } = useCompanyStore()
  const imageSrc = `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company?.image_url}`

  return (
    <header>
      <div className="align-center fixed z-1 flex h-[80px] w-full place-content-center justify-between border border-b-[#dcdcdc] bg-white px-50">
        <div className="flex items-center gap-1">
          <Link className="flex items-center gap-1" href={"/"}>
            {company?.image_url && (
              <Image
                width={200}
                height={200}
                src={imageSrc}
                alt="iManage logo"
                className="h-[50px] w-[100px] object-contain"
              />
            )}
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <ButtonComponent text="Entrar" onClickFn={() => router.push(`/${locale}/login`)} />
          </div>
        </nav>
      </div>
    </header>
  )
}
