"use client"

import Header from "@/components/header"
import "@/globals.css"
import { getCompanyByDomain } from "@/services/company"
import { useCompanyStore } from "@/stores/company-store"
import { Menu } from "@/types"
import "@radix-ui/themes/styles.css"
import { notFound } from "next/navigation"
import { useEffect } from "react"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menus: Menu[] = []
  const { update } = useCompanyStore()

  useEffect(() => {
    const company = window?.location?.hostname?.split(".")[0]
    if (!company) {
      return
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
      <Header menus={menus} />
      <div className="m-auto w-[80vw] pt-10">{children}</div>
    </div>
  )
}
