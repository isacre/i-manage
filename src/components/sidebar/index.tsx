"use client"
import logo from "@/assets/logo/imanagelogo.png"
import useUserData from "@/hooks/useUserData"
import { deleteCookie } from "@/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CiLogout } from "react-icons/ci"
import SidebarItem from "./item"
import * as s from "./styles"

type Menu = { icon: React.ReactNode; label: string; link: string }

export default function Sidebar({ menus }: { menus: Menu[] }) {
  const locale = useLocale()
  const router = useRouter()
  useUserData()

  function handleLogout() {
    deleteCookie("access")
    deleteCookie("refresh")
    router.push(`/${locale}/login`)
  }

  return (
    <div className={s.wrapperStyles}>
      <div className={s.logoContainerStyles}>
        <Image src={logo} alt="logo" width={120} className={s.logoStyles} />
      </div>
      <nav className={s.navStyles}>
        {menus.map((menu) => (
          <SidebarItem key={menu.label} icon={menu.icon} label={menu.label} link={`/${locale}${menu.link}`} />
        ))}
      </nav>
      <button className={s.logoutButtonStyles} onClick={handleLogout}>
        <CiLogout size={26} />
        <span className="font-medium">Sair</span>
      </button>
    </div>
  )
}
