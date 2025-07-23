import { ServiceType } from "@/stores/service-store"
import React, { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { useUserStore } from "@/stores/user-store"
import { FiClock, FiDollarSign, FiCalendar, FiSearch } from "react-icons/fi"
import { useCompanyStore } from "@/stores/company-store"

interface Props {
  services: ServiceType[]
  setBookingModalOpen: (open: boolean) => void
  setSelectedService: (service: number) => void
  setRegisterModalOpen: (open: string | undefined) => void
}

export default function ServicesComponent({
  services,
  setBookingModalOpen,
  setSelectedService,
  setRegisterModalOpen,
}: Props) {
  const t = useTranslations()
  const { user } = useUserStore()
  const companyColor = useCompanyStore((state) => state.company?.primary_color) || "transparent"
  const [searchQuery, setSearchQuery] = useState("")

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services

    const query = searchQuery.toLowerCase()
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(query) ||
        (service.description && service.description.toLowerCase().includes(query)),
    )
  }, [services, searchQuery])

  function handleBookingButton(service: ServiceType) {
    if (user) {
      setSelectedService(service.id)
      setBookingModalOpen(true)
    } else {
      setRegisterModalOpen("login")
    }
  }

  return (
    <div className="mt-4">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <FiSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("Company.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-2">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-gray-200 hover:bg-gray-50"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between">
                  <p className="truncate pr-4 text-base font-medium text-gray-900">{service.name}</p>
                </div>

                {service.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">{service.description}</p>
                )}

                <div className="mt-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <span className="font-medium text-emerald-600">
                      {t("Currency.symbol")} {service.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-500">
                    <FiClock className="h-3.5 w-3.5 flex-shrink-0 text-sky-500" />
                    <span className="font-medium text-sky-600">{service.max_duration} min</span>
                  </div>
                </div>
              </div>

              <div className="ml-3 flex-shrink-0">
                <button
                  className="group/btn inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-gradient-to-r px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:outline-none"
                  onClick={() => handleBookingButton(service)}
                  style={{ backgroundColor: companyColor }}
                >
                  <FiCalendar className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:scale-110" />
                  {t("Availability.bookable")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-8 text-center">
          <FiCalendar className="mb-3 h-10 w-10 text-gray-300" />
          <h3 className="mb-1 text-base font-medium text-gray-700">
            {searchQuery.trim() ? t("Company.noServicesFound") : t("Company.noServicesAvailable")}
          </h3>
          <p className="text-sm text-gray-400">
            {searchQuery.trim() ? t("Company.searchAdjustment") : t("Company.noServicesRegistered")}
          </p>
        </div>
      )}
    </div>
  )
}
