import { BookingType } from "@/stores/booking-store"
import { api } from ".."
import { useBookingFilters } from "@/hooks/useBooking"

export async function createBooking(booking: BookingType): Promise<{ sessionId: string; url: string }> {
  const response = await api.post(`/booking/bookService/`, { ...booking })
  return response.data
}

export async function getBookings(company: number, filters: useBookingFilters): Promise<BookingType[]> {
  const response = await api.get(`/booking/${company}/getBookings/`, { params: filters })
  return response.data
}
export async function updateBooking(id: number, data: { status: string }): Promise<BookingType> {
  const response = await api.patch(`/booking/${id}/`, data)
  return response.data
}

export async function patchBookingStatus(id: number, data: { status: string }): Promise<BookingType> {
  const response = await api.patch(`/booking/${id}/patchBookingStatus/`, data)
  return response.data
}

export async function completeBookingAfterPayment(session_id: string): Promise<BookingType> {
  const response = await api.post(`/booking/completeBookingAfterPayment/`, { session_id })
  return response.data
}
