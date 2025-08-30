"use client"
import { Company } from "@/components/company"
import Navbar from "@/components/navbar/navbar"
import { AuthModalProvider } from "@/contexts/authModal/AuthModalContext"
import useServices from "@/hooks/useServices"
import useUpdateCompanyByDomain from "@/hooks/useUpdateCompanyByDomain"
import useUserMenus from "@/hooks/useUserMenus"
import { useUserStore } from "@/stores/user-store"
import { useTranslations } from "next-intl"

export default function CompanyLandingPage() {
  const t = useTranslations()
  const { company } = useUpdateCompanyByDomain()
  const { services } = useServices(company?.identifier)
  const { user } = useUserStore()
  const { menus } = useUserMenus(user)

  if (!company) {
    return <div className="flex h-screen items-center justify-center">{t("Company.notFound")}</div>
  }

  return (
    <div className="rounded-lg border border-gray-200">
      <AuthModalProvider>
        <Navbar user={user} company={company} menus={menus} editMode={true} />
        <div className="m-auto lg:w-[85%]">
          <div>
            <div className="m-auto flex w-full flex-col gap-4">
              <Company.Banner edit_mode={true} />
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[3.25fr_1.25fr]">
                <Company.Services
                  services={services}
                  setBookingModalOpen={() => {}}
                  setSelectedService={() => {}}
                  setRegisterModalOpen={() => {}}
                />
                <Company.Details endereco={company.address} about={company.description} phone={company.phone} />
              </div>
            </div>
          </div>
        </div>
      </AuthModalProvider>
    </div>
  )
}
