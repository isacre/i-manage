"use client"
import { useCompanyStore } from "@/stores/company-store"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import Image from "next/image"
export default function Home() {
  const t = useTranslations("DaysOfWeek")
  const { company } = useCompanyStore()
  const dayjsFormatDayOfWeek = (day: number) => {
    return dayjs()
      .day(day + 1)
      .format("dddd")
  }
  const first_working_day = dayjsFormatDayOfWeek(company?.work_days[0] || 0)
  const last_working_day = dayjsFormatDayOfWeek(company?.work_days[company?.work_days.length - 1] || 0)
  const working_days = `${t(first_working_day).substring(0, 3)} - ${t(last_working_day).substring(0, 3)}`
  const opens_at = company?.opens_at?.substring(0, 5)
  const closes_at = company?.closes_at?.substring(0, 5)
  if (!company) {
    return <div>Empresa não encontrada</div>
  }
  return (
    <div className="p-8">
      <div className="h-[250px] w-full rounded-lg bg-gray-100" />
      <div className="relative mt-10 flex flex-col gap-4">
        <div className="absolute -top-15 left-5 flex items-center justify-center gap-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${company?.image_url}`}
            alt={company?.name}
            width={150}
            height={150}
            className="rounded-full border border-gray-200 bg-white"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{company?.name}</h1>
            <p className="text-sm text-gray-500">{company?.address}</p>
            <b className="text-sm text-gray-500">
              {working_days} - {opens_at} - {closes_at}
            </b>
          </div>
        </div>
      </div>
    </div>
  )
}
