import React from "react"
import { Booking } from "."
import { FaClock } from "react-icons/fa"
import dayjs from "dayjs"
import { BookingType } from "@/stores/booking-store"

interface Props {
  booking: BookingType
}

export default function TimeSection({ booking }: Props) {
  const startDate = dayjs(booking.start_date)
  const endDate = dayjs(booking.end_date)
  return (
    <Booking.Section>
      <FaClock className="h-4 w-4 text-gray-400" />
      <div>
        <p className="text-lg font-semibold text-gray-900">
          {startDate.format("HH:mm")} - {endDate.format("HH:mm")}
        </p>
        <p className="text-sm text-gray-500">{endDate.diff(startDate, "minute")} minutes</p>
      </div>
    </Booking.Section>
  )
}
