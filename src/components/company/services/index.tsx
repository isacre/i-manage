import { ServiceType } from "@/stores/service-store"
import React, { useState } from "react"
import { useTranslations } from "next-intl"
interface Props {
  services: ServiceType[]
  setBookingModalOpen: (open: boolean) => void
  setSelectedService: (service: number) => void
}

export default function ServicesComponent({ services, setBookingModalOpen, setSelectedService }: Props) {
  const t = useTranslations()
  return (
    <div className="w-full">
      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
              <p className="mt-1 text-gray-600">
                {t("Currency.symbol")} {service.price}
              </p>
            </div>
            <button
              className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              onClick={() => {
                setSelectedService(service.id)
                setBookingModalOpen(true)
              }}
            >
              {t("Availability.bookable")}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
