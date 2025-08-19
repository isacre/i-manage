import { BookingType } from "@/stores/booking-store"
import dayjs from "dayjs"
import { FaCalendarAlt } from "react-icons/fa"

interface Props {
  booking: BookingType
  statusConfig: any
}

export default function Header({ booking, statusConfig }: Props) {
  const startDate = dayjs(booking.start_date)
  const endDate = dayjs(booking.end_date)
  const isToday = startDate.isSame(dayjs(), "day")
  const StatusIcon = statusConfig.icon
  return (
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
  )
}
