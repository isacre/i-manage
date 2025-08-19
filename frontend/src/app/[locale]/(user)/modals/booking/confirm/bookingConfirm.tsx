"use client"
import { Button } from "@/components/ui/button"
import useFormatedDates from "@/hooks/useFormatedDates"
import { createBooking } from "@/services/company/booking"
import { BookingType, useBookingStore } from "@/stores/booking-store"
import { useServiceStore } from "@/stores/service-store"
import { SetStateFn } from "@/types"
import { useTranslations } from "next-intl"
import { toast } from "react-toastify"
import BookingDetails from "./bookingDetails"

interface Props {
  Booking: BookingType
  setOpen: SetStateFn<boolean>
}

export default function ConfirmingBooking({ Booking, setOpen }: Props) {
  const { services } = useServiceStore()
  const service = services.find((service) => service.id === Booking.service)
  console.log(Booking)
  const { month, year, hour, day, minute, dayOfWeek } = useFormatedDates(Booking.start_date)
  const { hour: endHour, minute: endMinute } = useFormatedDates(Booking.end_date)
  const { updateOpenBookingId } = useBookingStore()
  const t = useTranslations()

  function handleSubmit() {
    createBooking(Booking)
      .then((res) => {
        updateOpenBookingId(res.id)
      })
      .then(() => {
        setOpen(false)
        toast.success(t("Booking.successScheduling"))
      })
      .catch((err) => {
        toast.error(t("Booking.errorScheduling"))
      })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        {t(`Time.DaysOfWeek.${dayOfWeek}`)}, {day} de {t(`Time.Months.${String(Number(month))}`)} de {year}
      </h2>
      <BookingDetails
        service={service}
        Booking={Booking}
        hour={hour}
        minute={minute}
        endHour={endHour}
        endMinute={endMinute}
      />
      <Button onClick={handleSubmit} className="w-full" size="lg">
        {t("Booking.schedule")}
      </Button>
    </div>
  )
}
