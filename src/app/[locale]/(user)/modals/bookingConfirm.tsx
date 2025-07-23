"use client"
import { Button } from "@/components/ui/button"
import { createBooking } from "@/services/company/booking"
import { BookingType, useBookingStore } from "@/stores/booking-store"
import { useCompanyStore } from "@/stores/company-store"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { SetStateFn } from "@/types"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { toast } from "react-toastify"

interface Props {
  Booking: BookingType
  setRegisterOpen: SetStateFn<boolean>
  setOpen: SetStateFn<boolean>
}

export default function ConfirmingBooking({ Booking, setRegisterOpen, setOpen }: Props) {
  const { services } = useServiceStore()
  const service = services.find((service) => service.id === Booking.service)
  const { company } = useCompanyStore()
  const date = dayjs(Booking.start_date).tz("America/Sao_Paulo")
  const enddate = dayjs(Booking.end_date).tz("America/Sao_Paulo")
  const endDate = dayjs(enddate).format("HH:mm")
  const month = date.format("MM")
  const day = date.format("DD")
  const year = date.format("YYYY")
  const hour = date.format("HH")
  const minute = date.format("mm")
  const dayOfWeek = date.format("dddd")
  const t = useTranslations("Time.Months")
  const tCommon = useTranslations("Common")
  const weekDay = useTranslations("Time.DaysOfWeek")
  const tBooking = useTranslations("Booking")
  const tCurrency = useTranslations("Currency")
  const { updateOpenBookingId } = useBookingStore()
  const { user } = useUserStore()

  function handleSubmit() {
    setRegisterOpen(true)
    createBooking(Booking)
      .then((res) => {
        updateOpenBookingId(res.id)
      })
      .then(() => {
        if (user === null) {
          setRegisterOpen(true)
        } else {
          setOpen(false)
          toast.success(tBooking("successScheduling"))
        }
      })
      .catch((err) => {
        toast.error(tBooking("errorScheduling"))
      })
  }

  function getEmployeeName(employeeId: number) {
    const employee = service?.capable_employees.find((employee) => employee.id === employeeId)
    return employee?.name
  }

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {weekDay(dayOfWeek)}, {day} de {t(String(Number(month)))} de {year}
        </h2>
        <p className="text-gray-600">{company?.name}</p>
      </div>

      {/* Booking Details Card */}
      <div className="space-y-4 rounded-lg bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{service?.name}</h3>
          <p className="text-lg font-bold text-gray-900">
            {tCurrency("symbol")} {service?.price}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{tBooking("employee")}:</span>
            <span className="font-medium">
              {Booking.employees.length > 0
                ? Booking.employees.map((employeeId: any) => getEmployeeName(employeeId)).join(", ")
                : tBooking("noPreference")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">
              {hour}:{minute} - {endDate}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-lg font-bold text-gray-900">{tCommon("Total")}:</span>
          <span className="text-xl font-bold text-gray-900">
            {tCurrency("symbol")} {service?.price}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <Button onClick={handleSubmit} className="w-full" size="lg">
          {tBooking("schedule")}
        </Button>
      </div>
    </div>
  )
}
