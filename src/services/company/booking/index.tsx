import { BookingStatus, BookingType } from "@/stores/booking-store"
import { api } from ".."

export async function createBooking(booking: BookingType) {
  const response = await api.post(`/booking/bookService/`, { ...booking })
  return response.data
}

export async function getBookings(company: number, status: BookingStatus): Promise<BookingType[]> {
  const response = await api.get(`/booking/${company}/getBookings/`, { params: { status } })
  return response.data
}
export async function updateBooking(id: number, data: { status: string }): Promise<BookingType> {
  const response = await api.patch(`/booking/${id}/changeBookingStatus/`, data)
  return response.data
}
