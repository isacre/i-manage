"use client"
import useBookingDays from "@/hooks/useBookingDays"
import { useCompanyStore } from "@/stores/company-store"
import { SetStateFn } from "@/types"
import dayjs from "dayjs"
import * as s from "./styles"
import { useEffect } from "react"

interface Props {
  setMonthLabel: SetStateFn<string>
  clickedDate: dayjs.Dayjs | undefined
  setClickedDate: SetStateFn<dayjs.Dayjs | undefined>
}

export default function DayPicker({ setMonthLabel, clickedDate, setClickedDate }: Props) {
  const { currentWeek, handleNextWeek, handlePrevWeek, weeks } = useBookingDays({ setMonthLabel })
  const { company } = useCompanyStore()

  const handleDayClick = (weekdayIndex: number, date: dayjs.Dayjs) => {
    if (company?.work_days.indexOf(weekdayIndex) !== -1) {
      setClickedDate(date)
    }
  }

  const getDayCardClassName = (date: dayjs.Dayjs, weekdayIndex: number) => {
    const isToday = dayjs(date).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY")
    const isSelected = dayjs(date).format("DD/MM/YYYY") === dayjs(clickedDate).format("DD/MM/YYYY")
    const isDisabled = company?.work_days.indexOf(weekdayIndex) === -1

    return `${s.dayCardStyle} ${isToday ? s.dayVariants.today : ""} ${isDisabled ? s.dayVariants.disabled : ""} ${
      isSelected ? s.dayVariants.selected : ""
    }`
  }

  return (
    <div className={s.wrapperStyle}>
      <button className={s.navigationButtonStyle} onClick={handlePrevWeek}>
        &lt;
      </button>
      <div className={s.daysContainerStyle}>
        {weeks[currentWeek]?.map(({ day, weekday, weekdayIndex, date }) => (
          <div
            key={day}
            onClick={() => handleDayClick(weekdayIndex, date)}
            className={getDayCardClassName(date, weekdayIndex)}
          >
            <span>{weekday.substring(0, 3)}</span>
            <span>{day}</span>
            {company?.work_days.indexOf(weekdayIndex) !== -1 && <div className={s.availableIndicatorStyle} />}
          </div>
        ))}
      </div>
      <button className={s.navigationButtonStyle} onClick={handleNextWeek}>
        &gt;
      </button>
    </div>
  )
}
