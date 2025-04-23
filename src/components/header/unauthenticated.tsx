"use client"
import logo from "@/assets/logo/imanagelogo.png"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import ButtonComponent from "../formFields/button"
import { useRouter } from "next/navigation"
export default function UnauthenticatedHeader() {
  const locale = useLocale()
  const t = useTranslations("Header")
  const router = useRouter()

  return (
    <header>
      <div className="bg-red600 align-center fixed z-1 flex h-[80px] w-full place-content-center justify-between border border-b-[#dcdcdc] px-50">
        <div className="flex items-center gap-1">
          <Link className="flex items-center gap-1" href={"/"}>
            <Image src={logo} alt="iManage logo" className="h-[50px] w-[100px] object-contain" />
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <ButtonComponent
              onClickFn={() => router.push(`/${locale}/register`)}
              text={t("register")}
              backgroundHover={false}
              background="bg-transparent"
              color="text-red-600"
              weight="font-thin"
            />
            <ButtonComponent onClickFn={() => router.push(`/${locale}/login`)} text={t("login")} />
          </div>
        </nav>
      </div>
    </header>
  )
}
