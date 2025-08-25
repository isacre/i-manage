import { create } from "zustand"

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELED" | "COMPLETED" | "EXPIRED" | ""

export declare type BookingType = {
  id?: number
  start_date: string
  end_date: string
  company: string
  user: number | undefined
  service: number
  service_name?: string
  employees: { id: number; name: string; email: string }[] | number[]
  status?: BookingStatus
  created_at?: string
  updated_at?: string
  employee_names?: string[]
  session_id?: string
}
interface BookingStore {
  bookings: BookingType[]
  openBookingId: number | undefined
  update: (bookings: BookingType[]) => void
  add: (booking: BookingType) => void
  remove: (id: number) => void
  updateOpenBookingId: (id: number) => void
}
export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  openBookingId: undefined,
  update: (bookings) => set(() => ({ bookings })),
  add: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  remove: (id: number) => set((state) => ({ bookings: state.bookings.filter((booking) => booking.id !== id) })),
  updateOpenBookingId: (id: number) => set(() => ({ openBookingId: id })),
}))
