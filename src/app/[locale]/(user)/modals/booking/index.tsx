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
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import LoginModal from "../login"

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
  const { updateOpenBookingId } = useBookingStore()
  const [SelectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined)
  const [registerOpen, setRegisterOpen] = useState(false)
  const { availableHours, capableEmployees, isLoading } = useAvailableHours(
    selectedServiceId,
    ClickedDate?.format("YYYY-MM-DD") || "",
    SelectedEmployee,
  )
  const service = services.find((service) => service.id === selectedServiceId)
  const t = useTranslations("Months")

  function handleSubmit() {
    if (!selectedHour) return
    const datetime = dayjs(`${ClickedDate?.format("YYYY-MM-DD")}T${selectedHour}`).tz("America/Sao_Paulo", true) // `true` keeps local time as is
    const Booking: BookingType = {
      company: company?.identifier || "",
      employees: SelectedEmployee ? [Number(SelectedEmployee)] : [],
      service: service?.id || 0,
      user: user || undefined,
      start_date: datetime.format("YYYY-MM-DD HH:mm:ssT-03:00"),
      end_date: datetime.add(service?.max_duration || 0, "minutes").format("YYYY-MM-DD HH:mm:ssT-03:00"),
    }
    setRegisterOpen(true)
    /* createBooking(Booking)
      .then((res) => {
        updateOpenBookingId(res.id)
      })
      .then(() => {
        if (user === null) {
          setRegisterOpen(true)
        } else {
          setOpen(false)
          toast.success("Horário agendado com sucesso")
        }
      })
      .catch((err) => {
        toast.error("Não foi possível agendar o horário")
      }) */
  }

  useEffect(() => {
    setSelectedHour(undefined)
  }, [ClickedDate, SelectedEmployee])

  return (
    <>
      {registerOpen ? (
        <LoginModal initialOpen="register" isOpen={registerOpen} setOpen={setRegisterOpen} />
      ) : (
        <Modal isOpen={isOpen} setOpen={setOpen} title={service?.name || "Agendar horário"}>
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
            text="Agendar"
            width="w-full"
          />
        </Modal>
      )}
    </>
  )
}
