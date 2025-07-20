"use client"
import TableComponent from "@/components/table"
import useBooking, { useBookingFilters } from "@/hooks/useBooking"
import React, { useState } from "react"
import Booking from "./booking"
import TabsComponent from "@/components/tabs"
import { BookingStatus } from "@/stores/booking-store"

export default function Bookings() {
  const [Filters, setFilters] = useState<useBookingFilters>({
    status: "PENDING",
  })
  const { BookingsLoading, bookings, fetch } = useBooking(Filters)
  const filteredBookings = bookings.filter((item) => item.status !== "EXPIRED")
  return (
    <TableComponent.Root>
      <TableComponent.TopRow title="Agendamentos" />
      <TabsComponent
        tabs={[
          { value: "PENDING", text: "Pendentes", onClick: () => setFilters({ status: "PENDING" }) },
          { value: "", text: "Todos", onClick: () => setFilters({ status: "" }) },
          { value: "CONFIRMED", text: "Confirmados", onClick: () => setFilters({ status: "CONFIRMED" }) },
          { value: "CANCELED", text: "Cancelados", onClick: () => setFilters({ status: "CANCELED" }) },
        ]}
        activeTab={Filters.status}
        setActiveTab={(tab) => setFilters({ status: tab as BookingStatus })}
      />
      <TableComponent.Grid
        itemsAmount={bookings.length}
        gridTemplateColumns="1fr 1fr 1fr 1fr 0.5fr"
        headers={["Horário", "Serviço", "Funcionários", "Status", "Ações"]}
        loading={BookingsLoading}
      >
        {filteredBookings.length === 0 ? (
          <div className="py-10 text-center text-gray-500">Nenhum agendamento pendente</div>
        ) : (
          filteredBookings.map((item) => <Booking key={item.id} booking={item} fetch={fetch} />)
        )}
      </TableComponent.Grid>
    </TableComponent.Root>
  )
}
