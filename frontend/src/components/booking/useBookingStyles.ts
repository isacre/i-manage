import { FaCheckCircle, FaExclamationCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa"

export default function useBookingStyles(status?: string) {
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

  return getStatusConfig(status || "")
}
