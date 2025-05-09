"use client"
import DayPicker from "@/components/dayPicker"
import HourPicker from "@/components/hourPicker"
import Modal from "@/components/modal"
import { useAvailableHours } from "@/hooks/useAvailableHours"
import { SetStateFn, WeekDays } from "@/types"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import {} from "@/services/company/booking"
import ButtonComponent from "@/components/formFields/button"
import { BookingType } from "@/stores/booking-store"
import { CompanyType } from "@/types"
import { useUserStore } from "@/stores/user-store"
import { useServiceStore } from "@/stores/service-store"
import { useCompanyStore } from "@/stores/company-store"
interface Props {
  isOpen: boolean
  setOpen: SetStateFn<boolean>
  selectedServiceId: number | null
}

export default function BookingModal({ isOpen, selectedServiceId, setOpen }: Props) {
  console.log(selectedServiceId)
  const today = dayjs().tz("America/Sao_Paulo")
  const [ClickedDate, setClickedDate] = useState<dayjs.Dayjs | undefined>(today)
  const { availableHours, isLoading } = useAvailableHours(selectedServiceId, ClickedDate?.format("YYYY-MM-DD") || "")
  const [DateLabel, setDateLabel] = useState("")
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined)
  const { services } = useServiceStore()
  const { user } = useUserStore()
  const { company } = useCompanyStore()
  const t = useTranslations("Months")

  function handleSubmit() {
    const service = services.find((service) => service.id === selectedServiceId)
    const datetime = dayjs(`${ClickedDate?.format("YYYY-MM-DD")}T${selectedHour}`).tz("America/Sao_Paulo", true) // `true` keeps local time as is
    const Booking: BookingType = {
      company: company?.identifier || "",
      employees: [],
      service: service?.id || 0,
      user: user || undefined,
      start_date: datetime.format("YYYY-MM-DD HH:mm:ssT-03:00"),
      end_date: datetime.add(service?.max_duration || 0, "minutes").format("YYYY-MM-DD HH:mm:ssT-03:00"),
    }
    console.log(Booking)
  }

  useEffect(() => {
    setSelectedHour(undefined)
  }, [ClickedDate])

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title={`Agendar horário`}>
      <h2 className="mb-2 w-full text-center text-2xl font-bold">
        {t(String(Number(DateLabel.split("-")[0])))} - {DateLabel.split("-")[1]}
      </h2>
      <DayPicker setMonthLabel={setDateLabel} clickedDate={ClickedDate} setClickedDate={setClickedDate} />
      <HourPicker
        loading={isLoading}
        availableHours={availableHours}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
      />
      <ButtonComponent disabled={!selectedHour} onClickFn={handleSubmit} text="Agendar" width="w-full" />
    </Modal>
  )
}
