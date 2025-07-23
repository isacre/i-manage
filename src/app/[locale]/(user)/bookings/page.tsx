"use client"
import useBooking from "@/hooks/useBooking"
import { useUserStore } from "@/stores/user-store"
import { useTranslations } from "next-intl"
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser, FaTag } from "react-icons/fa"
import Link from "next/link"
import Booking from "./booking"

export default function UserBookingsPage() {
  const user = useUserStore()
  const t = useTranslations()
  const { bookings, BookingsLoading, fetch } = useBooking({
    status: "",
    user: user.user?.id ?? undefined,
  })

  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {bookings.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="max-w-md rounded-2xl border bg-white p-12 shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <FaCalendarAlt className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{t("User.noBookingsYet")}</h3>
              <p className="mb-6 text-gray-500">You haven't made any bookings yet. Start by exploring our services.</p>
              <Link
                href=".."
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-black shadow-sm transition-colors"
              >
                <FaArrowLeft className="h-4 w-4" />
                {t("Common.Back")}
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Loading State */}
            {BookingsLoading && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse rounded-xl border bg-white shadow-sm">
                    <div className="p-6">
                      <div className="mb-4 h-4 w-3/4 rounded bg-gray-200"></div>
                      <div className="mb-2 h-3 w-1/2 rounded bg-gray-200"></div>
                      <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bookings Grid */}
            {!BookingsLoading && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bookings.map((item) => (
                  <Booking key={item.id} booking={item} fetch={fetch} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
