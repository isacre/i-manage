import React from "react"
import Row from "../../../../../components/table/row"
import { BookingStatus, BookingType } from "../../../../../stores/booking-store"
import Button from "../../../../../components/formFields/button"
import { updateBooking } from "../../../../../services/company/booking"
import { toast } from "react-toastify"

export default function Booking({ booking }: { booking: BookingType }) {
  function handleUpdatingBooking(status: BookingStatus) {
    updateBooking(booking.id, { status })
      .then(() => {
        toast.success(`Agendamento ${status === "CONFIRMED" ? "aceito" : "negado"} com sucesso`)
      })
      .catch((err) => {
        console.log(err)
        toast.error(`Erro ao ${status === "CONFIRMED" ? "aceitar" : "negar"} o agendamento`)
      })
  }
  return (
    <Row gridTemplateColumns="1fr 1fr 0.25fr 0.25fr">
      <h1>{booking.start_date}</h1>
      <p>{booking.service.name}</p>
      <Button onClickFn={() => handleUpdatingBooking("CANCELED")} text="Negar" />
      <Button onClickFn={() => handleUpdatingBooking("CONFIRMED")} text="Aceitar" />
    </Row>
  )
}
