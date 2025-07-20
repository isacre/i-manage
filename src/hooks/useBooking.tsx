"use client"
import { getBookings } from "@/services/company/booking"
import { BookingStatus, useBookingStore } from "@/stores/booking-store"
import { useCompanyStore } from "@/stores/company-store"
import { useUserStore } from "@/stores/user-store"
import { useEffect, useState } from "react"

export type useBookingFilters = {
  status: BookingStatus
  user?: number
}
export default function useBooking(filters: useBookingFilters) {
  const [BookingsLoading, setBookingsLoading] = useState(false)
  const bookings = useBookingStore((state) => state.bookings)
  const saveBookings = useBookingStore((state) => state.update)
  const company = useCompanyStore((state) => state.company?.id)

  function fetch() {
    if (!company) {
      console.log(company)
      return
    }

    setBookingsLoading(true)
    getBookings(company, filters)
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
    fetch()
  }, [company, filters.status, filters.user])

  return { BookingsLoading, bookings, fetch }
}
