"use client"
import ButtonComponent from "@/components/formFields/button"
import { createBooking } from "@/services/company/booking"
import { BookingType, useBookingStore } from "@/stores/booking-store"
import { useCompanyStore } from "@/stores/company-store"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { SetStateFn } from "@/types"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { toast } from "react-toastify"

interface Props {
  Booking: BookingType
  setRegisterOpen: SetStateFn<boolean>
  setOpen: SetStateFn<boolean>
}

export default function ConfirmingBooking({ Booking, setRegisterOpen, setOpen }: Props) {
  const { services } = useServiceStore()
  const service = services.find((service) => service.id === Booking.service)
  const { company } = useCompanyStore()
  const date = dayjs(Booking.start_date).tz("America/Sao_Paulo")
  const enddate = dayjs(Booking.end_date).tz("America/Sao_Paulo")
  const endDate = dayjs(enddate).format("HH:mm")
  const month = date.format("MM")
  const day = date.format("DD")
  const year = date.format("YYYY")
  const hour = date.format("HH")
  const minute = date.format("mm")
  const dayOfWeek = date.format("dddd")
  const t = useTranslations("Months")
  const weekDay = useTranslations("DaysOfWeek")
  const { updateOpenBookingId } = useBookingStore()
  const { user } = useUserStore()

  function handleSubmit() {
    setRegisterOpen(true)
    createBooking(Booking)
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
      })
  }

  function getEmployeeName(employeeId: number) {
    const employee = service?.capable_employees.find((employee) => employee.id === employeeId)
    return employee?.name
  }

  return (
    <div>
      <div className="flex flex-col">
        <h2 className="w-full text-center text-2xl font-bold">
          {weekDay(dayOfWeek)}, {day} de {t(String(Number(month)))} de {year}
        </h2>
        <h3 className="text-center text-sm font-light">{company?.name}</h3>
        <div className="my-8 flex flex-col gap-4 rounded-lg border-y border-gray-200 bg-white p-2 py-4">
          <div className="flex justify-between">
            <p className="text-gray-800">{service?.name}</p>
            <p className="font-medium">R$ {service?.price}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-500">
              Funcionário:{" "}
              {Booking.employees.length > 0
                ? Booking.employees.map((employeeId: any) => getEmployeeName(employeeId)).join(", ")
                : "Sem preferência"}
            </p>
            <p className="text-gray-500">
              {hour}:{minute} - {endDate}
            </p>
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-gray-200 pt-3 font-bold">
            <p>Total:</p>
            <p>R${service?.price}</p>
          </div>
        </div>
      </div>
      <ButtonComponent onClickFn={handleSubmit} text="Agendar" width="w-full" />
    </div>
  )
}
