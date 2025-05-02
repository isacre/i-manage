import Header from "@/components/header"
import "@/globals.css"
import { routing } from "@/i18n/routing"
import { Menu } from "@/types"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Poppins } from "next/font/google"
import { redirect } from "next/navigation"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
  const menus: Menu[] = [
    { text: "eletric", link: "servicos/?eletrica" },
    { text: "mechanic", link: "servicos/?mecanica" },
    { text: "health", link: "servicos/?saude" },
    { text: "home", link: "servicos/?lar" },
    { text: "services", link: "servicos/?servicos" },
  ]
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    redirect(routing.defaultLocale)
  }
  const messages = await getMessages()

  return (
    <html lang={locale} className={poppins.className}>
      <body>
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
          <NextIntlClientProvider messages={messages}>
            <ToastContainer />
            <Header menus={menus} />
            <div className="m-auto w-[80vw] pt-25">{children}</div>
          </NextIntlClientProvider>
        </Theme>
      </body>
    </html>
  )
}
