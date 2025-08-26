"use client"
import useBooking from "@/hooks/useBooking"
import { useUserStore } from "@/stores/user-store"
import { useTranslations } from "next-intl"
import NoResults from "./noResults"
import { toast } from "react-toastify"
import { BookingStatus, BookingType } from "@/stores/booking-store"
import { patchBookingStatus } from "@/services/company/booking"
import Booking from "./booking"

export default function UserBookingsPage() {
  const user = useUserStore()
  const t = useTranslations()
  const { bookings, BookingsLoading, fetch } = useBooking({
    status: "",
    user: user.user?.id ?? undefined,
  })

  function handleUpdatingBooking(booking: BookingType, status: BookingStatus) {
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
    <div className="mx-auto min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      {bookings.length === 0 ? (
        <NoResults />
      ) : (
        <div>
          {!BookingsLoading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((item) => (
                <Booking
                  key={item.id}
                  booking={item}
                  handleUpdatingBooking={(status) => handleUpdatingBooking(item, status)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
