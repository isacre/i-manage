import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "@/components/sidebar";
import "@/globals.css";
import "@radix-ui/themes/styles.css";
import { FaUsers } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { Theme } from "@radix-ui/themes";

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const Menus = [
    {
      label: "Funcionários",
      link: "/admin/employees",
      icon: <FaUsers />,
    },
    {
      label: "Produtos",
      link: "/admin/products",
      icon: <FaUsers />,
    },
  ];

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
          <NextIntlClientProvider messages={messages}>
            <ToastContainer />
            <div className="flex">
              <Sidebar menus={Menus} />
              <div className="w-full h-full flex flex-col gap-4">{children}</div>
            </div>
          </NextIntlClientProvider>
        </Theme>
      </body>
    </html>
  );
}
