import ButtonComponent from "@/components/formFields/button"
import { BookingStatus, BookingType } from "@/stores/booking-store"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import React from "react"
import { PDFDownloadButton } from "../success/PDFUtils"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  booking: BookingType
  handleUpdatingBooking: (status: BookingStatus) => void
}
export default function Action({ booking, handleUpdatingBooking }: Props) {
  const t = useTranslations("Booking")
  const router = useRouter()
  return (
    <div className="flex flex-col gap-2 px-6 py-4">
      {["EXPIRED", "CANCELED", "COMPLETED"].indexOf(booking.status ?? "") === -1 && (
        <ButtonComponent
          text={"Cancel"}
          onClickFn={() => handleUpdatingBooking("CANCELED")}
          color="text-red-700"
          background="bg-red-50"
          width="w-full"
          padding="p-3"
          borderRadius="rounded-lg"
        />
      )}
      {booking.status === "PENDING" && booking.session_id && (
        <ButtonComponent
          text={t("pay")}
          onClickFn={() => router.push(`/bookings/success?session_id=${booking.session_id}`)}
          color="text-green-700"
          background="bg-green-50"
          width="w-full"
          padding="p-3"
          borderRadius="rounded-lg"
        />
      )}

      {booking.status === "CONFIRMED" && booking.session_id && (
        <ButtonComponent
          text={`View Receipt`}
          onClickFn={() => router.push(`/bookings/success?session_id=${booking.session_id}`)}
          color="text-blue-700"
          background="bg-blue-50"
          width="w-full"
          padding="p-3"
          borderRadius="rounded-lg"
        />
      )}
    </div>
  )
}
