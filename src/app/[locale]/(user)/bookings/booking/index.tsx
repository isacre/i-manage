import ButtonComponent from "@/components/formFields/button"
import Row from "@/components/table/row"
import { patchBookingStatus } from "@/services/company/booking"
import { BookingStatus, BookingType } from "@/stores/booking-store"
import dayjs from "dayjs"
import { toast } from "react-toastify"
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
    <Row gridTemplateColumns="1fr 1fr 1fr 1fr 130px">
      <h1>
        {dayjs(booking.start_date).format("DD/MM | HH:mm - ")} {dayjs(booking.end_date).format("HH:mm")}
      </h1>
      <p>{booking.service_name}</p>
      <p>{booking.status}</p>
      <p>{booking.employee_names?.join(", ")}</p>
      {["EXPIRED", "CANCELED", "COMPLETED"].indexOf(booking.status ?? "") === -1 && (
        <div>
          <ButtonComponent text={t("cancel")} onClickFn={() => handleUpdatingBooking("CANCELED")} />
        </div>
      )}
    </Row>
  )
}
