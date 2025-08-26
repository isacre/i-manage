import React from "react"
import useBookingStyles from "./useBookingStyles"
import { BookingType } from "@/stores/booking-store"

export default function Wrapper({ children, booking }: { children: React.ReactNode; booking: BookingType }) {
  const statusConfig = useBookingStyles(booking.status)
  return (
    <div
      className={`rounded-xl border bg-white shadow-sm ${statusConfig.borderColor} overflow-hidden transition-shadow duration-200 hover:shadow-md`}
    >
      {children}
    </div>
  )
}
