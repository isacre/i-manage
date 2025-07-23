"use client"
import { Company } from "@/components/company"
import useServices from "@/hooks/useServices"
import { useCompanyStore } from "@/stores/company-store"
import { useTranslations } from "next-intl"
import { useState } from "react"
import BookingModal from "./modals/bookingModal"
import { useAuthModal } from "./AuthModalContext"

export default function Home() {
  const t = useTranslations()
  const { company } = useCompanyStore()
  const { services } = useServices(company?.identifier)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const { setAuthModalState } = useAuthModal()

  if (!company) {
    return <div className="flex h-screen items-center justify-center">{t("Company.notFound")}</div>
  }
  return (
    <div className="">
      <BookingModal isOpen={bookingModalOpen} setOpen={setBookingModalOpen} selectedServiceId={selectedService} />
      <div className="flex h-[200px] w-full items-center justify-start bg-gray-100 bg-[url('/assets/clinicadorusso.jpg')] bg-cover bg-center pl-2 lg:rounded-b-md lg:bg-contain" />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[3.25fr_1.25fr]">
        <div className="flex flex-col">
          <Company.Services
            services={services}
            setBookingModalOpen={setBookingModalOpen}
            setSelectedService={setSelectedService}
            setRegisterModalOpen={setAuthModalState}
          />
        </div>
        <div className="hidden pt-4 md:block">
          <Company.Details endereco={company.address} about={company.description} phone={company.phone} />
        </div>
      </div>
    </div>
  )
}
