import ButtonComponent from "@/components/formFields/button"
import Row from "@/components/table/row"
import { patchBookingStatus } from "@/services/company/booking"
import { BookingStatus, BookingType } from "@/stores/booking-store"
import dayjs from "dayjs"
import { toast } from "react-toastify"

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
    <Row gridTemplateColumns="1fr 1fr 1fr 1fr 130px">
      <h1>
        {dayjs(booking.start_date).format("DD/MM | HH:mm - ")} {dayjs(booking.end_date).format("HH:mm")}
      </h1>
      <p>{booking.service_name}</p>
      <p>{booking.status}</p>
      <p>{booking.employee_names?.join(", ")}</p>
      {["EXPIRED", "CANCELED", "COMPLETED"].indexOf(booking.status ?? "") === -1 && (
        <div>
          <ButtonComponent text="Cancelar" onClickFn={() => handleUpdatingBooking("CANCELED")} />
        </div>
      )}
    </Row>
  )
}
