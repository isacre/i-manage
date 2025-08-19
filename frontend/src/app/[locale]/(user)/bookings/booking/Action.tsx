import ButtonComponent from "@/components/formFields/button"
import { BookingStatus, BookingType } from "@/stores/booking-store"
import { useTranslations } from "next-intl"
import React from "react"

interface Props {
  booking: BookingType
  handleUpdatingBooking: (status: BookingStatus) => void
}
export default function Action({ booking, handleUpdatingBooking }: Props) {
  const t = useTranslations("Booking")
  return (
    <div className="px-6 py-4">
      {["EXPIRED", "CANCELED", "COMPLETED"].indexOf(booking.status ?? "") === -1 && (
        <ButtonComponent
          text={t("cancel")}
          onClickFn={() => handleUpdatingBooking("CANCELED")}
          color="text-red-700"
          background="bg-red-50"
          width="w-full"
          padding="p-3"
          borderRadius="rounded-lg"
        />
      )}
    </div>
  )
}
