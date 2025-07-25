"use client"
import DayPicker from "@/components/dayPicker"
import EmployeePicker from "@/components/employeePicker"
import HourPicker from "@/components/hourPicker"
import { Button } from "@/components/ui/button"
import { useAvailableHours } from "@/hooks/useAvailableHours"
import { BookingType } from "@/stores/booking-store"
import { useCompanyStore } from "@/stores/company-store"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { SetStateFn } from "@/types"
import { calcWeekDayDiff } from "@/utils"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import ConfirmingBooking from "../confirm/bookingConfirm"
import Header from "./header"

interface Props {
  isOpen: boolean
  setOpen: SetStateFn<boolean>
  selectedServiceId: number | null
}

export default function BookingModal({ isOpen, selectedServiceId, setOpen }: Props) {
  const today = dayjs().tz("America/Sao_Paulo")
  const [ClickedDate, setClickedDate] = useState<dayjs.Dayjs | undefined>(today)
  const [DateLabel, setDateLabel] = useState("")
  const [selectingEmployee, setSelectingEmployee] = useState(false)
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined)
  const { services } = useServiceStore()
  const service = services.find((service) => service.id === selectedServiceId)
  const { user } = useUserStore()
  const { company } = useCompanyStore()
  const [ConfirmingBookingState, setConfirmingBooking] = useState(false)
  const [SelectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined)
  const { availableHours, capableEmployees, isLoading } = useAvailableHours(
    selectedServiceId,
    ClickedDate?.format("YYYY-MM-DD") || "",
    SelectedEmployee,
  )
  const t = useTranslations("Time.Months")
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
    setSelectingEmployee(false)
    setSelectedHour(undefined)
    setOpen(false)
  }

  useEffect(() => {
    setSelectedHour(undefined)
  }, [ClickedDate, SelectedEmployee])

  // If current day is not a work day, set the next work day as the clicked date
  useEffect(() => {
    const currentWeekDay = dayjs().tz("America/Sao_Paulo").day() - 1
    if (company?.work_days.indexOf(currentWeekDay) === -1) {
      setClickedDate(dayjs().add(calcWeekDayDiff(currentWeekDay, company?.work_days), "day"))
    }
  }, [isOpen])

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
              <ConfirmingBooking setOpen={setOpen} Booking={Booking} />
            </div>
          ) : (
            <div className="flex h-full flex-col p-6">
              <h3 className="mb-6 text-center text-xl font-bold text-gray-900">
                {t(String(Number(DateLabel.split("-")[0])))} - {DateLabel.split("-")[1]}
              </h3>

              <div className="flex-1 space-y-6 overflow-y-auto">
                <DayPicker setMonthLabel={setDateLabel} clickedDate={ClickedDate} setClickedDate={setClickedDate} />
                <label className="text-sm font-medium text-gray-700">Select Employee (Optional)</label>
                <EmployeePicker
                  selectedEmployee={SelectedEmployee}
                  setSelectedEmployee={setSelectedEmployee}
                  capableEmployees={capableEmployees}
                  selectingEmployee={selectingEmployee}
                  setSelectingEmployee={setSelectingEmployee}
                />
                {!selectingEmployee && (
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700">Select Time</label>
                    <HourPicker
                      loading={isLoading}
                      availableHours={availableHours}
                      selectedHour={selectedHour}
                      setSelectedHour={setSelectedHour}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {!ConfirmingBookingState && (
          <div className="flex-shrink-0 border-t bg-gray-50 p-4">
            <Button
              disabled={!selectedHour && !selectingEmployee}
              onClick={moveToConfirmingBooking}
              className="w-full"
              size="lg"
            >
              {tBooking("selectTime")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
