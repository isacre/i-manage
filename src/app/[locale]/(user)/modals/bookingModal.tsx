"use client"
import DayPicker from "@/components/dayPicker"
import EmployeePicker from "@/components/employeePicker"
import HourPicker from "@/components/hourPicker"
import { Button } from "@/components/ui/button"
import { useAvailableHours } from "@/hooks/useAvailableHours"
import { BookingType, useBookingStore } from "@/stores/booking-store"
import { useCompanyStore } from "@/stores/company-store"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { SetStateFn } from "@/types"
import { calcWeekDayDiff } from "@/utils"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { IoClose, IoArrowBack } from "react-icons/io5"
import ConfirmingBooking from "./bookingConfirm"

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
  const { user } = useUserStore()
  const { company } = useCompanyStore()
  const [ConfirmingBookingState, setConfirmingBooking] = useState(false)
  const [SelectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined)
  const [registerOpen, setRegisterOpen] = useState(false)
  const { availableHours, capableEmployees, isLoading } = useAvailableHours(
    selectedServiceId,
    ClickedDate?.format("YYYY-MM-DD") || "",
    SelectedEmployee,
  )
  const service = services.find((service) => service.id === selectedServiceId)
  const t = useTranslations("Time.Months")
  const tBooking = useTranslations("Booking")
  const datetime =
    dayjs(`${ClickedDate?.format("YYYY-MM-DD")}T${selectedHour}`).tz("America/Sao_Paulo", true) || undefined
  const [Booking, setBooking] = useState<BookingType>({
    company: company?.identifier || "",
    employees: SelectedEmployee ? [Number(SelectedEmployee)] : [],
    service: service?.id || 0,
    user: user?.id || undefined,
    start_date: "",
    end_date: "",
  })

  function handleSubmit() {
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

  function handleBack() {
    setConfirmingBooking(false)
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

  // Handle situation where today is not a work day
  useEffect(() => {
    const currentWeekDay = dayjs().tz("America/Sao_Paulo").day() - 1
    if (company?.work_days.indexOf(currentWeekDay) === -1) {
      setClickedDate(dayjs().add(calcWeekDayDiff(currentWeekDay, company?.work_days), "day"))
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        {/* Header - Fixed height */}
        <div className="flex flex-shrink-0 items-center justify-between border-b bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            {ConfirmingBookingState && (
              <button onClick={handleBack} className="rounded-full p-1 transition-colors hover:bg-gray-200">
                <IoArrowBack size={20} />
              </button>
            )}
            <h2 className="text-lg font-semibold text-gray-900">
              {ConfirmingBookingState ? tBooking("confirmTitle") : service?.name || tBooking("title")}
            </h2>
          </div>
          <button onClick={handleClose} className="rounded-full p-1 transition-colors hover:bg-gray-200">
            <IoClose size={20} />
          </button>
        </div>

        {/* Content - Fixed height with scroll */}
        <div className="flex-1 overflow-y-auto">
          {ConfirmingBookingState ? (
            <div className="flex h-full flex-col p-6">
              <ConfirmingBooking setOpen={setOpen} setRegisterOpen={setRegisterOpen} Booking={Booking} />
            </div>
          ) : (
            <div className="flex h-full flex-col p-6">
              {/* Month/Year Header */}
              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {t(String(Number(DateLabel.split("-")[0])))} - {DateLabel.split("-")[1]}
                </h3>
              </div>

              {/* Scrollable content area */}
              <div className="flex-1 space-y-6 overflow-y-auto">
                {/* Day Picker */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Select Date</h4>
                  <DayPicker setMonthLabel={setDateLabel} clickedDate={ClickedDate} setClickedDate={setClickedDate} />
                </div>

                {/* Employee Picker */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Select Employee (Optional)</h4>
                  <EmployeePicker
                    selectedEmployee={SelectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    capableEmployees={capableEmployees}
                    selectingEmployee={selectingEmployee}
                    setSelectingEmployee={setSelectingEmployee}
                  />
                </div>

                {/* Hour Picker */}
                {!selectingEmployee && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Select Time</h4>
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

        {/* Footer - Fixed height */}
        {!ConfirmingBookingState && (
          <div className="flex-shrink-0 border-t bg-gray-50 p-4">
            <Button disabled={!selectedHour && !selectingEmployee} onClick={handleSubmit} className="w-full" size="lg">
              {tBooking("selectTime")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
