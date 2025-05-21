"use client"

import Header from "@/components/header"
import "@/globals.css"
import { getCompanyByDomain } from "@/services/company"
import { useCompanyStore } from "@/stores/company-store"
import { Menu } from "@/types"
import "@radix-ui/themes/styles.css"
import { notFound, redirect } from "next/navigation"
import { useEffect, useState } from "react"
import LoginModal from "./modals/login"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menus: Menu[] = []
  const { update } = useCompanyStore()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    const company = window?.location?.hostname?.split(".")[0]
    if (["imanage", "imanage.com", "localhost"].includes(company)) {
      return redirect("/about")
    }
    getCompanyByDomain(company)
      .then((res) => {
        update(res)
      })
      .catch((err) => {
        return notFound()
      })
  }, [])

  return (
    <div>
      <LoginModal isOpen={isLoginModalOpen} setOpen={setIsLoginModalOpen} />
      <Header menus={menus} setIsLoginModalOpen={setIsLoginModalOpen} setIsRegisterModalOpen={() => {}} />
      <div className="m-auto w-[80vw] pt-[70px]">{children}</div>
    </div>
  )
}
