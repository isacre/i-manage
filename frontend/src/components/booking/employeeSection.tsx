import { Booking } from "@/components/booking"
import { BookingType } from "@/stores/booking-store"
import { FaUser } from "react-icons/fa"

interface Props {
  booking: BookingType
}

export default function EmployeeSection({ booking }: Props) {
  return (
    <Booking.Section>
      <FaUser className="h-4 w-4 text-gray-400" />
      <div>
        <p className="font-medium text-gray-900">{booking.employee_names?.join(", ") || "No employee assigned"}</p>
        <p className="text-sm text-gray-500">Assigned staff</p>
      </div>
    </Booking.Section>
  )
}
