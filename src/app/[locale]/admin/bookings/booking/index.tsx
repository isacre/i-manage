import React from "react"
import Row from "@/components/table/row"
import { BookingStatus, BookingType } from "@/stores/booking-store"
import Button from "@/components/formFields/button"
import { patchBookingStatus } from "@/services/company/booking"
import { toast } from "react-toastify"
import dayjs from "dayjs"

export default function Booking({ booking, fetch }: { booking: BookingType; fetch: () => void }) {
  function handleUpdatingBooking(status: BookingStatus) {
    const confirmation = window.confirm(`Deseja ${status === "CONFIRMED" ? "aceitar" : "negar"} o agendamento?`)
    if (!confirmation) return
    if (booking.id) {
      patchBookingStatus(booking?.id, { status })
        .then(() => {
          toast.success(`Agendamento ${status === "CONFIRMED" ? "aceito" : "negado"} com sucesso`)
          fetch()
        })
        .catch((err) => {
          console.log(err)
          toast.error(`Erro ao ${status === "CONFIRMED" ? "aceitar" : "negar"} o agendamento`)
        })
    }
  }

  return (
    <Row gridTemplateColumns="1fr 1fr 1fr 1fr 0.5fr">
      <h1>
        {dayjs(booking.start_date).format("DD/MM/YYYY | HH:mm - ")} {dayjs(booking.end_date).format("HH:mm")}
      </h1>
      <p>{booking.service_name}</p>
      <p>{booking.employee_names?.join(", ")}</p>
      <p>{booking.status}</p>
      {["PENDING", "CONFIRMED"].indexOf(booking.status ?? "") !== -1 && (
        <div className="flex items-center gap-2">
          <Button onClickFn={() => handleUpdatingBooking("CANCELED")} text="Cancelar" />
          {booking.status === "PENDING" && (
            <Button onClickFn={() => handleUpdatingBooking("CONFIRMED")} text="Aceitar" />
          )}
        </div>
      )}
    </Row>
  )
}
