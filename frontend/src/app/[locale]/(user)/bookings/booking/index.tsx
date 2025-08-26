import { Booking } from "@/components/booking"
import { BookingStatus, BookingType } from "@/stores/booking-store"

export default function BookingWrapper({
  booking,
  handleUpdatingBooking,
}: {
  booking: BookingType
  handleUpdatingBooking: (status: BookingStatus) => void
}) {
  return (
    <Booking.Wrapper booking={booking}>
      <Booking.Header booking={booking} />
      <Booking.TimeSection booking={booking} />
      <Booking.ServiceSection booking={booking} />
      <Booking.EmployeeSection booking={booking} />
      <Booking.Actions booking={booking} handleUpdatingBooking={handleUpdatingBooking} />
    </Booking.Wrapper>
  )
}
