"use client"
import useBookingDays from "@/hooks/useBookingDays"
import { useCompanyStore } from "@/stores/company-store"
import { SetStateFn } from "@/types"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

interface Props {
  setMonthLabel: SetStateFn<string>
  clickedDate: dayjs.Dayjs | undefined
  setClickedDate: SetStateFn<dayjs.Dayjs | undefined>
}

export default function DayPicker({ setMonthLabel, clickedDate, setClickedDate }: Props) {
  const { currentWeek, handleNextWeek, handlePrevWeek, weeks } = useBookingDays({ setMonthLabel })
  const { company } = useCompanyStore()
  const currentWeekDays = weeks[currentWeek] || []
  const workDays = currentWeekDays.filter(({ weekdayIndex }) => company?.work_days.indexOf(weekdayIndex) !== -1)

  function handleDayClick(weekdayIndex: number, date: dayjs.Dayjs) {
    if (company?.work_days.indexOf(weekdayIndex) !== -1) {
      setClickedDate(date)
    }
  }

  function getWeekdayClassName(date: dayjs.Dayjs) {
    const isSelected = dayjs(date).format("DD/MM/YYYY") === dayjs(clickedDate).format("DD/MM/YYYY")
    return twMerge("mb-1 block text-xs font-medium text-gray-500", isSelected && "text-white")
  }

  function getDayCardClassName(date: dayjs.Dayjs, weekdayIndex: number) {
    const isToday = dayjs(date).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY")
    const isSelected = dayjs(date).format("DD/MM/YYYY") === dayjs(clickedDate).format("DD/MM/YYYY")
    const isDisabled = company?.work_days.indexOf(weekdayIndex) === -1

    return twMerge(
      "flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-200 min-h-[60px] sm:min-h-[70px] p-2 sm:p-3",
      isToday && !isSelected && "border-blue-500 bg-blue-50",
      isSelected && "border-blue-600 bg-blue-600 text-white shadow-md",
      !isSelected && !isDisabled && !isToday && "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50",
      isDisabled && "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed",
      !isDisabled && "cursor-pointer",
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={handlePrevWeek}
          className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-sm font-medium transition-colors hover:bg-gray-50"
        >
          <IoChevronBack size={16} />
        </button>
        <div className="flex-1">
          {workDays.length > 0 ? (
            <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${workDays.length}, 1fr)` }}>
              {workDays.map(({ day, weekday, weekdayIndex, date }) => (
                <div
                  key={day}
                  onClick={() => handleDayClick(weekdayIndex, date)}
                  className={getDayCardClassName(date, weekdayIndex)}
                >
                  <span className={getWeekdayClassName(date)}>{weekday.substring(0, 3)}</span>
                  <span className="text-lg font-bold sm:text-xl">{day}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[70px] items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-500">No working days this week</p>
            </div>
          )}
        </div>
        <button
          onClick={handleNextWeek}
          className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-sm font-medium transition-colors hover:bg-gray-50"
        >
          <IoChevronForward size={16} />
        </button>
      </div>
    </div>
  )
}
