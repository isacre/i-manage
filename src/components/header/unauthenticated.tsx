"use client"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import ButtonComponent from "../formFields/button"
import { useRouter } from "next/navigation"
import { useCompanyStore } from "../../stores/company-store"
import { ContainerStyles } from "./styles"
import { WrapperStyles } from "./styles"

interface Props {
  setIsLoginModalOpen: (open: boolean) => void
  setIsRegisterModalOpen: (open: boolean) => void
}

export default function UnauthenticatedHeader({ setIsLoginModalOpen, setIsRegisterModalOpen }: Props) {
  const locale = useLocale()
  const t = useTranslations("Header")
  const router = useRouter()
  const { company } = useCompanyStore()
  const imageSrc = `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company?.image_url}`

  return (
    <header>
      <div className={WrapperStyles}>
        <div className={ContainerStyles}>
          <div className="">
            <Link className="" href={"/"}>
              {company?.image_url && (
                <Image src={imageSrc} width={50} height={50} alt={`${company.name} logo`} layout="intrinsic" />
              )}
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <ButtonComponent text="Entrar" onClickFn={() => setIsLoginModalOpen(true)} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
