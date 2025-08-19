"use client"
import { Company } from "@/components/company"
import useServices from "@/hooks/useServices"
import { useCompanyStore } from "@/stores/company-store"
import { useTranslations } from "next-intl"
import { useState } from "react"
import BookingModal from "./modals/booking/booking/bookingModal"
import { useAuthModal } from "./AuthModalContext"

type Props = {
  edit_mode?: boolean
}

export default function CompanyLandingPage() {
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
    <div className="flex flex-col gap-4">
      <BookingModal isOpen={bookingModalOpen} setOpen={setBookingModalOpen} selectedServiceId={selectedService} />
      <Company.Banner />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[3.25fr_1.25fr]">
        <Company.Services
          services={services}
          setBookingModalOpen={setBookingModalOpen}
          setSelectedService={setSelectedService}
          setRegisterModalOpen={setAuthModalState}
        />
        <Company.Details endereco={company.address} about={company.description} phone={company.phone} />
      </div>
    </div>
  )
}
