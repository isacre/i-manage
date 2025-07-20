"use client"
import Sidebar from "../../../components/sidebar"
import { useTranslations } from "next-intl"
import { Poppins } from "next/font/google"
import { FaCalendar, FaPalette, FaUsers } from "react-icons/fa"
import { MdOutlinePriceChange } from "react-icons/md"

import "@/globals.css"
import useUpdateCompanyByDomain from "@/hooks/useUpdateCompanyByDomain"
import LoadingSpinner from "@/components/loadingSpinner"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("ADMIN")
  const {} = useUpdateCompanyByDomain()

  const Menus = [
    {
      label: t("Customize.title"),
      link: "/admin/customize",
      icon: <FaPalette />,
    },
    {
      label: t("Bookings.title"),
      link: "/admin/bookings",
      icon: <FaCalendar />,
    },
    {
      label: t("Employees.title"),
      link: "/admin/employees",
      icon: <FaUsers />,
    },
    {
      label: t("Services.title"),
      link: "/admin/services",
      icon: <MdOutlinePriceChange />,
    },
  ]

  return (
    <div className="flex">
      <nav>
        <Sidebar menus={Menus} />
      </nav>
      <main className="flex h-screen w-full flex-col">{children}</main>
    </div>
  )
}
