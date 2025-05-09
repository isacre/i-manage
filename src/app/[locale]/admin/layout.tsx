import Sidebar from "@/components/sidebar"
import "@/globals.css"
import { routing } from "@/i18n/routing"
import { Theme } from "@radix-ui/themes"
import { NextIntlClientProvider, useTranslations } from "next-intl"
import { getMessages } from "next-intl/server"
import { Poppins } from "next/font/google"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { FaCalendar, FaUsers } from "react-icons/fa"
import { MdOutlinePriceChange } from "react-icons/md"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const t = useTranslations("ADMIN")
  const Menus = [
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
      <Sidebar menus={Menus} />
      <div className="flex h-full w-full flex-col">{children}</div>
    </div>
  )
}
