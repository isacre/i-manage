import "@/globals.css"
import { routing } from "@/i18n/routing"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { redirect } from "next/navigation"
import "react-toastify/dist/ReactToastify.css"
import getCompanyByDomainAndGenerateMetadata from "./metadata"
import { headers } from "next/headers"
import { RootLayoutProps } from "./types"

const locales = ["en", "pt-BR"] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: (typeof locales)[number] }> }) {
  const { locale } = await params
  const host = (await headers()).get("host") || ""
  return await getCompanyByDomainAndGenerateMetadata({ locale, host })
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params
  const messages = await getMessages()

  if (!routing.locales.includes(locale as (typeof locales)[number])) {
    redirect(routing.defaultLocale)
  }

  return (
    <html lang={locale}>
      <body>
        <Theme>
          <NextIntlClientProvider messages={messages}>
            <div>{children}</div>
          </NextIntlClientProvider>
        </Theme>
      </body>
    </html>
  )
}
