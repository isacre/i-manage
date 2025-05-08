import { create } from "zustand"
import { UserType } from "./user-store"

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELED" | "COMPLETED" | ""

export declare type BookingType = {
  id?: number
  start_date: string
  end_date: string
  company: string
  user: UserType | undefined
  service: number
  employees: number[]
  status?: BookingStatus
  created_at?: string
  updated_at?: string
}
interface BookingStore {
  bookings: BookingType[]
  update: (bookings: BookingType[]) => void
  add: (booking: BookingType) => void
  remove: (id: number) => void
}
export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  update: (bookings) => set(() => ({ bookings })),
  add: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  remove: (id: number) => set((state) => ({ bookings: state.bookings.filter((booking) => booking.id !== id) })),
}))
