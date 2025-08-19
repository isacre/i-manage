import { ServiceType } from "@/stores/service-store"
import React from "react"
import { IoArrowBack, IoClose } from "react-icons/io5"

interface Props {
  ConfirmingBookingState: boolean
  setConfirmingBooking: (value: boolean) => void
  service?: ServiceType
  tBooking: any
  handleClose: () => void
}
export default function Header({
  ConfirmingBookingState,
  setConfirmingBooking,
  service,
  tBooking,
  handleClose,
}: Props) {
  return (
    <div className="flex flex-shrink-0 items-center justify-between border-b bg-gray-50 p-4">
      <div className="flex items-center gap-2">
        {ConfirmingBookingState && (
          <button
            onClick={() => setConfirmingBooking(false)}
            className="rounded-full p-1 transition-colors hover:bg-gray-200"
          >
            <IoArrowBack size={20} />
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-900">
          {ConfirmingBookingState ? tBooking("confirmTitle") : service?.name || tBooking("title")}
        </h2>
      </div>
      <button onClick={handleClose} className="rounded-full p-1 transition-colors hover:bg-gray-200">
        <IoClose size={20} />
      </button>
    </div>
  )
}
