"use client"
import DayPicker from "@/components/dayPicker"
import EmployeePicker from "@/components/employeePicker"
import ButtonComponent from "@/components/formFields/button"
import HourPicker from "@/components/hourPicker"
import Modal from "@/components/modal"
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

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      title={ConfirmingBookingState ? tBooking("confirmTitle") : service?.name || tBooking("title")}
      returnFunction={ConfirmingBookingState ? () => setConfirmingBooking(false) : undefined}
    >
      {ConfirmingBookingState ? (
        <ConfirmingBooking setOpen={setOpen} setRegisterOpen={setRegisterOpen} Booking={Booking} />
      ) : (
        <>
          <div className="flex h-[600px] flex-col gap-2">
            <h2 className="mb-2 w-full text-center text-2xl font-bold">
              {t(String(Number(DateLabel.split("-")[0])))} - {DateLabel.split("-")[1]}
            </h2>
            <DayPicker setMonthLabel={setDateLabel} clickedDate={ClickedDate} setClickedDate={setClickedDate} />
            <EmployeePicker
              selectedEmployee={SelectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              capableEmployees={capableEmployees}
              selectingEmployee={selectingEmployee}
              setSelectingEmployee={setSelectingEmployee}
            />
            {!selectingEmployee && (
              <HourPicker
                loading={isLoading}
                availableHours={availableHours}
                selectedHour={selectedHour}
                setSelectedHour={setSelectedHour}
              />
            )}
          </div>
          <ButtonComponent
            disabled={!selectedHour && !selectingEmployee}
            onClickFn={handleSubmit}
            text={tBooking("selectTime")}
            width="w-full"
          />
        </>
      )}
    </Modal>
  )
}
