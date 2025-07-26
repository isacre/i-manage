import { useTranslations } from "next-intl"
import { FaCalendar, FaPalette, FaUsers } from "react-icons/fa"
import { MdOutlinePriceChange } from "react-icons/md"
import Sidebar from "@/components/sidebar"
import getCompanyByDomainAndGenerateMetadata from "../metadata"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return await getCompanyByDomainAndGenerateMetadata(locale)
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Admin")
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
      <ToastContainer />
      <nav>
        <Sidebar menus={Menus} />
      </nav>
      <main className="flex h-screen w-full flex-col overflow-y-auto">{children}</main>
    </div>
  )
}
