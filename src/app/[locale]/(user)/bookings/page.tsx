"use client"
import TableComponent from "@/components/table"
import useBooking, { useBookingFilters } from "@/hooks/useBooking"
import { useUserStore } from "@/stores/user-store"
import Link from "next/link"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import Booking from "./booking"

export default function UserBookingsPage() {
  const user = useUserStore()
  const [Filters, setFilters] = useState<useBookingFilters>({
    status: "",
    user: user.user?.id ?? undefined,
  })
  const { bookings, BookingsLoading, fetch } = useBooking(Filters)

  return (
    <div>
      {bookings.length === 0 ? (
        <>
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-2xl font-semibold">Meus Agendamentos</h1>
            <p className="mb-6 text-gray-600">Você ainda não possui nenhum agendamento.</p>
            <Link
              href=".."
              className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-black transition-colors"
            >
              <FaArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </div>
        </>
      ) : (
        <TableComponent.Root>
          <TableComponent.Grid
            itemsAmount={bookings.length}
            gridTemplateColumns="1fr 1fr 1fr 1fr 130px"
            headers={["Horário", "Serviço", "Status", "Funcionários", "Cancelar"]}
            loading={BookingsLoading}
          >
            {bookings.length === 0 ? (
              <div className="py-10 text-center text-gray-500">Nenhum agendamento pendente</div>
            ) : (
              bookings.map((item) => <Booking key={item.id} booking={item} fetch={fetch} />)
            )}
          </TableComponent.Grid>
        </TableComponent.Root>
      )}
    </div>
  )
}
