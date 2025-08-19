"use client"
import useBooking from "@/hooks/useBooking"
import { useUserStore } from "@/stores/user-store"
import { useTranslations } from "next-intl"
import Booking from "./booking"
import NoResults from "./noResults"

export default function UserBookingsPage() {
  const user = useUserStore()
  const t = useTranslations()
  const { bookings, BookingsLoading, fetch } = useBooking({
    status: "",
    user: user.user?.id ?? undefined,
  })

  return (
    <div className="mx-auto min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      {bookings.length === 0 ? (
        <NoResults />
      ) : (
        <div>
          {!BookingsLoading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((item) => (
                <Booking key={item.id} booking={item} fetch={fetch} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
