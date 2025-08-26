import { HeaderMenu } from "@/components/navbar/navbar"
import { UserType, useUserStore } from "@/stores/user-store"
import { Cookie } from "@/utils/index"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import React from "react"

export default function useUserMenus(user: UserType | null) {
  const { update: updateUser } = useUserStore()
  const router = useRouter()
  const t = useTranslations()
  const menus: HeaderMenu[] = [
    {
      label: t("User.myBookings"),
      href: "/bookings",
      buttonStyle: "ghost",
    },
    {
      href: "",
      label: t("Common.Exit"),
      onClick: handleLogout,
    },
    {
      href: "/admin/bookings",
      label: "Admin",
      show: user?.company !== null,
    },
  ]

  function handleLogout() {
    Cookie.delete("access")
    Cookie.delete("refresh")
    updateUser(null)
    router.push("/")
  }

  return { menus }
}
