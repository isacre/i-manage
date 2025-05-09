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
      <div className="h-[200px] w-full rounded-b-lg bg-gray-100 bg-[url('https://png.pngtree.com/background/20211217/original/pngtree-health-care-abstract-light-effect-icon-decoration-picture-image_1591329.jpg')] bg-center" />
      <div className="grid w-full grid-cols-[3fr_1.5fr] gap-4">
        <div className="flex flex-col gap-4">
          <div className="mt-[-25px] pl-4">
            <Company.Profile company={company} />
          </div>
          <Company.Services
            services={services}
            setBookingModalOpen={setBookingModalOpen}
            setSelectedService={setSelectedService}
          />
        </div>
        <div className="pt-4">
          <Company.Details endereco={company.address} about={company.description} phone={company.phone} />
        </div>
      </div>
    </div>
  )
}
