"use client"
import { Button } from "@/components/ui/button"
import useFormatedDates from "@/hooks/useFormatedDates"
import { createBooking } from "@/services/company/booking"
import { BookingType } from "@/stores/booking-store"
import { useServiceStore } from "@/stores/service-store"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "react-toastify"
import BookingDetails from "./bookingDetails"

interface Props {
  Booking: BookingType
  onClose: () => void
}

export default function ConfirmingBooking({ Booking, onClose }: Props) {
  const { services } = useServiceStore()
  const service = services.find((service) => service.id === Booking.service)
  const { month, year, hour, day, minute, dayOfWeek } = useFormatedDates(Booking.start_date)
  const { hour: endHour, minute: endMinute } = useFormatedDates(Booking.end_date)
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations()

  function handlePayNow() {
    setIsLoading(true)
    createBooking(Booking)
      .then(({ url }) => {
        window.open(url)
      })
      .then(() => {
        onClose()
        toast.success(t("Booking.successScheduling"))
      })
      .catch((err) => {
        toast.error(t("Booking.errorScheduling"))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handlePayAfterService() {
    setIsLoading(true)
    createBooking({ ...Booking, status: "PENDING" })
      .then(() => {
        onClose()
        toast.success(t("Booking.successScheduling"))
      })
      .catch((err) => {
        toast.error(t("Booking.errorScheduling"))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        {t(`Time.DaysOfWeek.${dayOfWeek}`)}, {day} de {t(`Time.Months.${String(Number(month))}`)} de {year}
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <>
          <BookingDetails
            service={service}
            Booking={Booking}
            hour={hour}
            minute={minute}
            endHour={endHour}
            endMinute={endMinute}
          />
          <Button onClick={handlePayNow} className="w-full" size="lg">
            {"Pay now"}
          </Button>
          <Button onClick={handlePayAfterService} className="w-full" size="lg" variant="ghost">
            {"Pay after service"}
          </Button>
        </>
      )}
    </div>
  )
}
