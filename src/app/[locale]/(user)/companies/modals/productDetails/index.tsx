"use client"
import DayPicker from "@/components/dayPicker"
import Modal from "@/components/modal"
import { useAvailableHours } from "@/hooks/useAvailableHours"
import { SetStateFn, WeekDays } from "@/types"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface Props {
  isOpen: boolean
  setOpen: SetStateFn<boolean>
  selectedProduct: number
  companyWorkDays: WeekDays[]
}

export default function ProductDetailsModal({ isOpen, selectedProduct, setOpen, companyWorkDays }: Props) {
  const [ClickedDate, setClickedDate] = useState<dayjs.Dayjs | undefined>(undefined)
  const { availableHours, isLoading } = useAvailableHours(selectedProduct, ClickedDate?.format("YYYY-MM-DD") || "")
  const [DateLabel, setDateLabel] = useState("")
  const t = useTranslations("Months")

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title={`Agendar horário`}>
      <h2 className="mb-2 w-full text-center text-2xl font-bold">
        {t(String(Number(DateLabel.split("-")[0])))} - {DateLabel.split("-")[1]}
      </h2>
      <DayPicker setMonthLabel={setDateLabel} clickedDate={ClickedDate} setClickedDate={setClickedDate} />
      {isLoading ? (
        <div className="m-auto flex h-[200px] items-center justify-center text-center">Carregando...</div>
      ) : (
        <div className="grid grid-cols-6 gap-1 p-5">
          {availableHours.map((hour) => (
            <div className="cursor-pointer rounded-md border p-2 text-center hover:bg-gray-100" key={hour}>
              {hour}
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}
