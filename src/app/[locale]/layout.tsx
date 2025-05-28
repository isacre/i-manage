import "@/globals.css"
import { routing } from "@/i18n/routing"
import { getCompanyByDomain } from "@/services/company"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Poppins } from "next/font/google"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const headersList = await headers()
  const domain = headersList.get("host")?.split(":")[0]
  const subdomain = domain?.split(".")[0]

  if (!subdomain) return { title: "iManage" }

  try {
    const company = await getCompanyByDomain(subdomain)
    return {
      title: `${company.name}`,
      description: company.description || "Sistema de agendamento inteligente.",
      icons: {
        icon: `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.image_url}`,
        shortcut: `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.image_url}`,
      },
      robots: "index, follow",
      locale: locale,
      type: "website",
      openGraph: {
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company.image_url}`,
          },
        ],
      },
    }
  } catch (err) {}
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  if (!routing.locales.includes(locale as any)) {
    redirect(routing.defaultLocale)
  }
  return (
    <html lang={locale} className={poppins.className}>
      <body>
        <Theme accentColor="red">
          <NextIntlClientProvider messages={messages}>
            <ToastContainer />
            <div>{children}</div>
          </NextIntlClientProvider>
        </Theme>
      </body>
    </html>
  )
}
