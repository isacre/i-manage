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

export default function Booking({ booking, fetch }: { booking: BookingType; fetch: () => void }) {
  const t = useTranslations("Booking")

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

  const getStatusConfig = (status: string) => {
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

  const statusConfig = getStatusConfig(booking.status || "")
  const StatusIcon = statusConfig.icon
  const startDate = dayjs(booking.start_date)
  const endDate = dayjs(booking.end_date)
  const isPast = startDate.isBefore(dayjs(), "day")
  const isToday = startDate.isSame(dayjs(), "day")

  return (
    <div
      className={`rounded-xl border bg-white shadow-sm ${statusConfig.borderColor} overflow-hidden transition-shadow duration-200 hover:shadow-md`}
    >
      {/* Date Header */}
      <div className={`${statusConfig.bgColor} border-b px-6 py-4 ${statusConfig.borderColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className={`h-5 w-5 ${statusConfig.color}`} />
            <div>
              <p className="text-sm font-medium text-gray-900">{startDate.format("dddd, MMMM D")}</p>
              <p className={`text-xs ${statusConfig.color} font-medium`}>
                {isToday ? "Today" : startDate.format("YYYY")}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
            <span className={`text-sm font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
          </div>
        </div>
      </div>

      {/* Time Section */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center space-x-3">
          <FaClock className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {startDate.format("HH:mm")} - {endDate.format("HH:mm")}
            </p>
            <p className="text-sm text-gray-500">{endDate.diff(startDate, "minute")} minutes</p>
          </div>
        </div>
      </div>

      {/* Service Section */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center space-x-3">
          <FaTag className="h-4 w-4 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{booking.service_name}</p>
            <p className="text-sm text-gray-500">Service</p>
          </div>
        </div>
      </div>

      {/* Employee Section */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center space-x-3">
          <FaUser className="h-4 w-4 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{booking.employee_names?.join(", ") || "No employee assigned"}</p>
            <p className="text-sm text-gray-500">Assigned staff</p>
          </div>
        </div>
      </div>

      {/* Action Section */}
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
    </div>
  )
}
