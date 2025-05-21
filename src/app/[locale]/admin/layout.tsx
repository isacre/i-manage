import Sidebar from "../../../components/sidebar"
import { useTranslations } from "next-intl"
import { Poppins } from "next/font/google"
import { FaCalendar, FaUsers } from "react-icons/fa"
import { MdOutlinePriceChange } from "react-icons/md"

import "@/globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
