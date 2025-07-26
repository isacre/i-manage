"use client"
import { getBookings } from "@/services/company/booking"
import { BookingStatus, useBookingStore } from "@/stores/booking-store"
import { useCompanyStore } from "@/stores/company-store"
import { useUserStore } from "@/stores/user-store"
import { useCallback, useEffect, useState } from "react"

export type useBookingFilters = {
  status: BookingStatus
  user?: number
}
export default function useBooking(filters: useBookingFilters) {
  const [BookingsLoading, setBookingsLoading] = useState(false)
  const bookings = useBookingStore((state) => state.bookings)
  const saveBookings = useBookingStore((state) => state.update)
  const company = useUserStore((state) => state.user?.company?.id)

  const fetch = useCallback(() => {
    if (!company) {
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
  }, [company, filters.status, filters.user, saveBookings])

  useEffect(() => {
    fetch()
  }, [company, filters.status, filters.user, fetch])

  return { BookingsLoading, bookings, fetch }
}
