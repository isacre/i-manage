"use client"
import Header from "@/components/header"
import "@/globals.css"
import useUpdateCompanyByDomain from "@/hooks/useUpdateCompanyByDomain"
import { useUserStore } from "@/stores/user-store"
import { Menu } from "@/types"
import { deleteCookie } from "@/utils"
import "@radix-ui/themes/styles.css"
import { useState, createContext, useContext } from "react"
import { CiLogout } from "react-icons/ci"
import { FaCalendar } from "react-icons/fa"
import AuthModal from "./modals/auth"
import { AuthModalContext } from "./AuthModalContext"
import Navbar from "@/components/navbar/navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { update: updateUser } = useUserStore()
  const { company } = useUpdateCompanyByDomain()
  const { user } = useUserStore()

  const menus: Menu[] = [
    {
      text: "Meus Agendamentos",
      icon: FaCalendar,
      link: "/bookings",
    },
    {
      text: "Sair",
      icon: CiLogout,
      onClick: () => {
        deleteCookie("access")
        deleteCookie("refresh")
        updateUser(null)
      },
    },
  ]
  const [authModalState, setAuthModalState] = useState<string | undefined>(undefined)

  return (
    <AuthModalContext.Provider value={{ authModalState, setAuthModalState }}>
      <div>
        <AuthModal state={authModalState} setState={setAuthModalState} />
        {/* <Header menus={menus} setAuthModalState={setAuthModalState} /> */}
        <Navbar setAuthModalState={setAuthModalState} user={user} company={company} />
        <div className="m-auto lg:w-[80vw]">{children}</div>
      </div>
    </AuthModalContext.Provider>
  )
}
