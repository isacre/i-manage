import { getBookings } from "@/services/admin/booking"
import { BookingStatus, useBookingStore } from "@/stores/booking-store"
import { useCompanyStore } from "@/stores/company-store"
import { useUserStore } from "@/stores/user-store"
import { useEffect, useState } from "react"

export type useBookingFilters = {
  status: BookingStatus
}
export default function useBooking(filters: useBookingFilters) {
  const [BookingsLoading, setBookingsLoading] = useState(false)
  const bookings = useBookingStore((state) => state.bookings)
  const saveBookings = useBookingStore((state) => state.update)
  const company = useUserStore((state) => state.user?.company)

  function fetch() {
    if (!company) return
    setBookingsLoading(true)
    getBookings(company.id, filters.status)
      .then((res) => {
        saveBookings(res)
        setBookingsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setBookingsLoading(false)
      })
  }

  useEffect(() => {
    console.log(filters)
    fetch()
  }, [filters])

  return { BookingsLoading, bookings }
}
