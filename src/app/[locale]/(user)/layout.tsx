"use client"
import Navbar, { HeaderMenu } from "@/components/navbar/navbar"
import { useUserStore } from "@/stores/user-store"
import { deleteCookie } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AuthModalContext } from "./AuthModalContext"
import { useTranslations } from "next-intl"
import useUpdateCompanyByDomain from "@/hooks/useUpdateCompanyByDomain"
import AuthModal from "./modals/auth"
import "@radix-ui/themes/styles.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { update: updateUser } = useUserStore()
  const { company } = useUpdateCompanyByDomain()
  const { user } = useUserStore()
  const [authModalState, setAuthModalState] = useState<string | undefined>(undefined)
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
  ]

  function handleLogout() {
    deleteCookie("access")
    deleteCookie("refresh")
    updateUser(null)
    router.push("/")
  }

  return (
    <AuthModalContext.Provider value={{ authModalState, setAuthModalState }}>
      <AuthModal state={authModalState} setState={setAuthModalState} />
      <Navbar setAuthModalState={setAuthModalState} user={user} company={company} menus={menus} />
      <div className="m-auto lg:w-[78vw]">{children}</div>
    </AuthModalContext.Provider>
  )
}
