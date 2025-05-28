"use server"
import iManageLogo from "@/assets/logo/imanagelogo.png"
import { Button, Link } from "@radix-ui/themes"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { FaCalendar, FaCheckCircle, FaUsers } from "react-icons/fa"
import { redirect } from "next/navigation"

export default async function LandingPage() {
  const t = await getTranslations("About")
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-6xl pt-6">
        <div className="flex justify-center">
          <Image src={iManageLogo} width={150} height={150} alt="iManage Logo" />
        </div>
      </section>
      <section className="mx-auto flex max-w-6xl items-center justify-center px-4 py-20 text-center">
        <div>
          <h1 className="mb-6 text-3xl font-bold sm:text-4xl md:text-6xl">
            {t.rich("header", { bold: (chunks) => <b className="text-red-600">{chunks}</b> })}
          </h1>
          <p className="mb-6 text-lg">{t("description")}</p>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button className="!bg-red-600" style={{ cursor: "pointer" }}>
              {t("button")}
            </Button>
            <Link href="http://clinicadorusso.localhost:3000/">
              <Button className="!border-red-600 !text-red-600" variant="outline" style={{ cursor: "pointer" }}>
                {t("secondary_button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 text-center md:grid-cols-3">
          <div>
            <FaCalendar size={48} className="mx-auto mb-4 text-red-600" />
            <h3 className="mb-2 text-xl font-semibold">{t("features.booking.title")}</h3>
            <p>{t("features.booking.description")}</p>
          </div>
          <div>
            <FaUsers size={48} className="mx-auto mb-4 text-red-600" />
            <h3 className="mb-2 text-xl font-semibold">{t("features.team.title")}</h3>
            <p>{t("features.team.description")}</p>
          </div>
          <div>
            <FaCheckCircle size={48} className="mx-auto mb-4 text-red-600" />
            <h3 className="mb-2 text-xl font-semibold">{t("features.payment.title")}</h3>
            <p>{t("features.payment.description")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="mb-6 text-4xl font-bold">{t("footer.title")}</h2>
        <p className="mb-10 text-lg text-gray-700">{t("footer.subtitle")}</p>
        <Button className="!bg-red-600" style={{ cursor: "pointer" }}>
          {t("footer.button")}
        </Button>
      </section>
    </main>
  )
}
