"use client"
import { Company } from "@/components/company"
import useServices from "@/hooks/useServices"
import { useCompanyStore } from "@/stores/company-store"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function CompanyLandingPage() {
  const t = useTranslations()
  const { company } = useCompanyStore()
  const { services } = useServices(company?.identifier)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)

  if (!company) {
    return <div className="flex h-screen items-center justify-center">{t("Company.notFound")}</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <Company.Banner />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[3.25fr_1.25fr]">
        <Company.Services
          services={services}
          setBookingModalOpen={setBookingModalOpen}
          setSelectedService={setSelectedService}
          setRegisterModalOpen={() => {}}
        />
        <Company.Details endereco={company.address} about={company.description} phone={company.phone} />
      </div>
    </div>
  )
}
