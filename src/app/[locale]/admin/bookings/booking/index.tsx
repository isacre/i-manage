import React from "react"
import Row from "@/components/table/row"
import { BookingStatus, BookingType } from "@/stores/booking-store"
import Button from "@/components/formFields/button"
import { patchBookingStatus } from "@/services/company/booking"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"

export default function Booking({ booking, fetch }: { booking: BookingType; fetch: () => void }) {
  const t = useTranslations("Booking")

  function handleUpdatingBooking(status: BookingStatus) {
    const action = status === "CONFIRMED" ? t("accept") : t("cancel")
    const confirmation = window.confirm(t("confirmBooking", { action }))
    if (!confirmation) return
    if (booking.id) {
      patchBookingStatus(booking?.id, { status })
        .then(() => {
          const successMessage = status === "CONFIRMED" ? t("bookingAccepted") : t("bookingCanceled")
          toast.success(successMessage)
          fetch()
        })
        .catch((err) => {
          console.log(err)
          toast.error(t("errorUpdatingBooking"))
        })
    }
  }

  return (
    <Row gridTemplateColumns="1fr 1fr 1fr 1fr 0.5fr">
      <h1>
        {dayjs(booking.start_date).format("DD/MM/YYYY | HH:mm - ")} {dayjs(booking.end_date).format("HH:mm")}
      </h1>
      <p>{booking.service_name}</p>
      <p>{booking.employee_names?.join(", ")}</p>
      <p>{booking.status}</p>
      {["PENDING", "CONFIRMED"].indexOf(booking.status ?? "") !== -1 && (
        <div className="flex items-center gap-2">
          <Button onClickFn={() => handleUpdatingBooking("CANCELED")} text={t("cancel")} />
          {booking.status === "PENDING" && (
            <Button onClickFn={() => handleUpdatingBooking("CONFIRMED")} text={t("accept")} />
          )}
        </div>
      )}
    </Row>
  )
}
