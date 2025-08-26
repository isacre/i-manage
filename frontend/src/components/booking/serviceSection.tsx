import { Booking } from "@/components/booking"
import { BookingType } from "@/stores/booking-store"
import { FaTag } from "react-icons/fa"

interface Props {
  booking: BookingType
}

export default function ServiceSection({ booking }: Props) {
  return (
    <Booking.Section>
      <FaTag className="h-4 w-4 text-gray-400" />
      <div>
        <p className="font-medium text-gray-900">{booking.service_name}</p>
        <p className="text-sm text-gray-500">Service</p>
      </div>
    </Booking.Section>
  )
}
