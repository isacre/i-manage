import Header from "@/components/header";
import { routing } from "@/i18n/routing";
import { Menu } from "@/types";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import "@/globals.css";
import "@radix-ui/themes/styles.css";

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const menus: Menu[] = [
    { text: "eletric", link: "servicos/?eletrica" },
    { text: "mechanic", link: "servicos/?mecanica" },
    { text: "health", link: "servicos/?saude" },
    { text: "home", link: "servicos/?lar" },
    { text: "services", link: "servicos/?servicos" },
  ];
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header menus={menus} />
          <div className="pt-25 w-[80vw] m-auto">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
