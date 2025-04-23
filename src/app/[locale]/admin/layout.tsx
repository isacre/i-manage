import { routing } from "@/i18n/routing"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound, redirect } from "next/navigation"
import { FaUsers } from "react-icons/fa"
import { MdOutlinePriceChange } from "react-icons/md"
import { ToastContainer } from "react-toastify"
import Sidebar from "@/components/sidebar"
import { Theme } from "@radix-ui/themes"
import { Poppins } from "next/font/google"
import "react-toastify/dist/ReactToastify.css"
import "@/globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const Menus = [
    {
      label: "Funcionários",
      link: "/admin/employees",
      icon: <FaUsers />,
    },
    {
      label: "Serviços",
      link: "/admin/services",
      icon: <MdOutlinePriceChange />,
    },
  ]

  if (!routing.locales.includes(locale as any)) {
    redirect("/")
  }
  const messages = await getMessages()
  return (
    <html lang={locale} className={poppins.className}>
      <body>
        <Theme>
          <NextIntlClientProvider messages={messages}>
            <ToastContainer />
            <div className="flex">
              <Sidebar menus={Menus} />
              <div className="flex h-full w-full flex-col">{children}</div>
            </div>
          </NextIntlClientProvider>
        </Theme>
      </body>
    </html>
  )
}
