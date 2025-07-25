import { BookingType } from "@/stores/booking-store"
import { ServiceType } from "@/stores/service-store"
import { useTranslations } from "next-intl"
import React from "react"

export default function BookingDetails({
  service,
  Booking,
  hour,
  minute,
  endHour,
  endMinute,
}: {
  service?: ServiceType
  Booking: BookingType
  hour: string
  minute: string
  endHour: string
  endMinute: string
}) {
  const t = useTranslations()

  function getEmployeeName(employeeId: number) {
    const employee = service?.capable_employees.find((employee) => employee.id === employeeId)
    return employee?.name
  }
  return (
    <div className="space-y-4 rounded-lg bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{service?.name}</h3>
        <p className="text-lg font-bold text-gray-900">
          {t("Currency.symbol")} {service?.price}
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">{t("Booking.employee")}:</span>
          <span className="font-medium">
            {Booking.employees.length > 0
              ? Booking.employees.map((employeeId: any) => getEmployeeName(employeeId)).join(", ")
              : t("Booking.noPreference")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Time:</span>
          <span className="font-medium">
            {hour}:{minute} - {endHour}:{endMinute}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-lg font-bold text-gray-900">{t("Common.Total")}:</span>
        <span className="text-xl font-bold text-gray-900">
          {t("Currency.symbol")} {service?.price}
        </span>
      </div>
    </div>
  )
}
