import React from "react"
import { HeaderMenu } from "./navbar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { useCompanyStore } from "@/stores/company-store"

export default function NavbarButton({ menu }: { menu: HeaderMenu }) {
  const router = useRouter()
  const companyColor = useCompanyStore((state) => state.company?.primary_color) || "transparent"
  const backgroundColor = clsx({
    "bg-transparent": menu.buttonStyle === "ghost",
    "text-white": menu.buttonStyle !== "ghost",
  })

  return (
    <Button
      key={menu.label}
      onClick={() => {
        menu.href && router.push(menu.href)
        menu.onClick?.()
      }}
      variant={menu.buttonStyle || "default"}
      className={backgroundColor}
      style={{ backgroundColor: `${menu.buttonStyle === "ghost" ? "transparent" : companyColor}` }}
    >
      {menu.label}
    </Button>
  )
}
