"use client"
import { SetStateFn } from "@/types"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
  setMonthLabel: SetStateFn<string>
}

export default function useBookingDays({ setMonthLabel }: Props) {
  const today = dayjs()
  const [days, setDays] = useState<{ day: number; weekday: string; weekdayIndex: number; date: dayjs.Dayjs }[]>([])
  const [currentMonth, setCurrentMonth] = useState(dayjs().month())
  const [currentYear, setCurrentYear] = useState(dayjs().year())
  const [currentWeek, setCurrentWeek] = useState(0)
  const t = useTranslations("Time.DaysOfWeek")
  const weeks: { day: number; weekday: string; weekdayIndex: number; date: dayjs.Dayjs }[][] = []

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  function handlePrevWeek() {
    if (currentWeek === 0 && currentMonth === today.get("month")) {
      return
    }
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1)
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
        setCurrentWeek(weeks.length - 1)
      }
    }
  }

  function handleNextWeek() {
    if (currentWeek < weeks.length - 1) {
      setCurrentWeek(currentWeek + 1)
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
      setCurrentWeek(0)
    }
  }

  useEffect(() => {
    const today = dayjs().tz("America/Sao_Paulo")
    const month = currentMonth
    const year = currentYear

    setMonthLabel(`${month} - ${year}`)
    const daysInMonth = today.month(month).year(year).daysInMonth()
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const weekday = dayjs(`${year}-${month + 1}-${day}`).format("dddd")
      const date = dayjs.tz(
        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00`,
        "America/Sao_Paulo",
      )

      if (date.isBefore(today, "day")) {
        return null
      } else {
        return {
          day,
          weekday: t(weekday),
          weekdayIndex: (date.day() + 6) % 7,
          date: date,
        }
      }
    })
    setDays(daysArray.filter((item) => item !== null))
  }, [currentMonth, currentYear])

  useEffect(() => {
    if (weeks[currentWeek] === undefined && weeks.length > 0) {
      setCurrentWeek(weeks.length - 1)
    }
  }, [weeks[currentWeek]])

  return { handleNextWeek, handlePrevWeek, weeks, currentWeek }
}
