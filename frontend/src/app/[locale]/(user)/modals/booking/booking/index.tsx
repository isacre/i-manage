"use client"
import { Button } from "@/components/ui/button"
import { BookingType } from "@/stores/booking-store"
import { useCompanyStore } from "@/stores/company-store"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { SetStateFn } from "@/types"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useState } from "react"
import ConfirmingBooking from "../confirm"
import DatePicker from "./datePicker"
import Header from "./header"

interface Props {
  isOpen: boolean
  setOpen: SetStateFn<boolean>
  selectedServiceId: number | null
}

export default function BookingModal({ isOpen, selectedServiceId, setOpen }: Props) {
  const today = dayjs().tz("America/Sao_Paulo")
  const [ClickedDate, setClickedDate] = useState<dayjs.Dayjs | undefined>(today)
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined)
  const { services } = useServiceStore()
  const service = services.find((service) => service.id === selectedServiceId)
  const { user } = useUserStore()
  const { company } = useCompanyStore()
  const [ConfirmingBookingState, setConfirmingBooking] = useState(false)
  const [SelectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined)
  const tBooking = useTranslations("Booking")
  const [Booking, setBooking] = useState<BookingType>({
    company: company?.identifier || "",
    employees: SelectedEmployee ? [Number(SelectedEmployee)] : [],
    service: service?.id || 0,
    user: user?.id || undefined,
    start_date: "",
    end_date: "",
  })

  function moveToConfirmingBooking() {
    const datetime =
      dayjs(`${ClickedDate?.format("YYYY-MM-DD")}T${selectedHour}`).tz("America/Sao_Paulo", true) || undefined
    if (!selectedHour) return
    setBooking({
      company: company?.identifier || "",
      employees: SelectedEmployee ? [Number(SelectedEmployee)] : [],
      service: service?.id || 0,
      user: user?.id || undefined,
      start_date: datetime?.toISOString() || "",
      end_date: datetime?.add(service?.max_duration || 0, "minutes").toISOString() || "",
    })
    setConfirmingBooking(true)
  }

  function handleClose() {
    setConfirmingBooking(false)
    setSelectedHour(undefined)
    setOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <Header
          ConfirmingBookingState={ConfirmingBookingState}
          setConfirmingBooking={setConfirmingBooking}
          service={service}
          tBooking={tBooking}
          handleClose={handleClose}
        />
        <div className="flex-1 overflow-y-auto">
          {ConfirmingBookingState ? (
            <div className="flex h-full flex-col p-6">
              <ConfirmingBooking onClose={handleClose} Booking={Booking} />
            </div>
          ) : (
            <DatePicker
              clickedDate={ClickedDate}
              setClickedDate={setClickedDate}
              selectedEmployee={SelectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              selectedServiceId={selectedServiceId}
              selectedHour={selectedHour}
              setSelectedHour={setSelectedHour}
            />
          )}
        </div>
        {!ConfirmingBookingState && (
          <div className="flex-shrink-0 border-t bg-gray-50 p-4">
            <Button disabled={!selectedHour} onClick={moveToConfirmingBooking} className="w-full" size="lg">
              {tBooking("selectTime")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
