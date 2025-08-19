"use client"
import { CompanyType } from "@/types"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import Image from "next/image"

interface Props {
  company: CompanyType
}

export default function CompanyProfileComponent({ company }: Props) {
  const t = useTranslations("Time.DaysOfWeek")
  const { name, address, opens_at, closes_at, work_days, image_url } = company
  const dayjsFormatDayOfWeek = (day: number) => {
    return dayjs()
      .day(day + 1)
      .format("dddd")
  }
  const first_working_day = dayjsFormatDayOfWeek(work_days[0] || 0)
  const last_working_day = dayjsFormatDayOfWeek(work_days[work_days.length - 1] || 0)
  const working_days = `${t(first_working_day).substring(0, 3)} - ${t(last_working_day).substring(0, 3)}`
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <div className="justify-left flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <b>{working_days}</b> | {opens_at.substring(0, 5)} - {closes_at.substring(0, 5)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
