"use client"
import { Company } from "@/components/company"
import useServices from "@/hooks/useServices"
import { useCompanyStore } from "@/stores/company-store"
import { ServiceType } from "@/stores/service-store"
import { useTranslations } from "next-intl"
import { useState } from "react"
import BookingModal from "./modals/booking"

export default function Home() {
  const t = useTranslations("DaysOfWeek")
  const { company } = useCompanyStore()
  const { services } = useServices(company?.identifier)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)

  if (!company) {
    return <div className="flex h-screen items-center justify-center">Empresa não encontrada</div>
  }
  return (
    <div className="">
      <BookingModal isOpen={bookingModalOpen} setOpen={setBookingModalOpen} selectedServiceId={selectedService} />
      <Company.Profile company={company} />
      <Company.Services
        services={services}
        setBookingModalOpen={setBookingModalOpen}
        setSelectedService={setSelectedService}
      />
    </div>
  )
}
