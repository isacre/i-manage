import ButtonComponent from "@/components/formFields/button"
import { patchBookingStatus } from "@/services/company/booking"
import { BookingStatus, BookingType } from "@/stores/booking-store"
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaTag,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaHourglassHalf,
} from "react-icons/fa"
import Header from "./Header"
import Section from "./Section"
import Action from "./Action"

export default function Booking({ booking, fetch }: { booking: BookingType; fetch: () => void }) {
  const t = useTranslations("Booking")
  const statusConfig = getStatusConfig(booking.status || "")
  const startDate = dayjs(booking.start_date)
  const endDate = dayjs(booking.end_date)

  function handleUpdatingBooking(status: BookingStatus) {
    const action = status === "CONFIRMED" ? t("accept") : t("cancel")
    const confirmation = window.confirm(t("confirmBooking", { action }))
    if (!confirmation) return
    if (booking.id) {
      patchBookingStatus(booking?.id, { status })
        .then(() => {
          const successMessage = status === "CONFIRMED" ? t("bookingAccepted") : t("bookingCanceled")
          toast.success(successMessage)
          fetch()
        })
        .catch((err) => {
          console.log(err)
          toast.error(t("errorUpdatingBooking"))
        })
    }
  }

  function getStatusConfig(status: string) {
    switch (status) {
      case "CONFIRMED":
        return {
          icon: FaCheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "Confirmed",
        }
      case "PENDING":
        return {
          icon: FaHourglassHalf,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          label: "Pending",
        }
      case "CANCELED":
        return {
          icon: FaTimesCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          label: "Canceled",
        }
      case "COMPLETED":
        return {
          icon: FaCheckCircle,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          label: "Completed",
        }
      case "EXPIRED":
        return {
          icon: FaExclamationCircle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: "Expired",
        }
      default:
        return {
          icon: FaExclamationCircle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: status,
        }
    }
  }

  return (
    <div
      className={`rounded-xl border bg-white shadow-sm ${statusConfig.borderColor} overflow-hidden transition-shadow duration-200 hover:shadow-md`}
    >
      <Header booking={booking} statusConfig={statusConfig} />
      <Section>
        <FaClock className="h-4 w-4 text-gray-400" />
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {startDate.format("HH:mm")} - {endDate.format("HH:mm")}
          </p>
          <p className="text-sm text-gray-500">{endDate.diff(startDate, "minute")} minutes</p>
        </div>
      </Section>
      <Section>
        <FaTag className="h-4 w-4 text-gray-400" />
        <div>
          <p className="font-medium text-gray-900">{booking.service_name}</p>
          <p className="text-sm text-gray-500">Service</p>
        </div>
      </Section>
      <Section>
        <FaUser className="h-4 w-4 text-gray-400" />
        <div>
          <p className="font-medium text-gray-900">{booking.employee_names?.join(", ") || "No employee assigned"}</p>
          <p className="text-sm text-gray-500">Assigned staff</p>
        </div>
      </Section>
      <Action booking={booking} handleUpdatingBooking={handleUpdatingBooking} />
    </div>
  )
}
