"use client"
import TableComponent from "@/components/table"
import TabsComponent from "@/components/tabs"
import useBooking, { useBookingFilters } from "@/hooks/useBooking"
import { BookingStatus } from "@/stores/booking-store"
import { useTranslations } from "next-intl"
import { useState } from "react"
import Booking from "./booking"
import BookingModal from "./modals/booking"

export default function Bookings() {
  const t = useTranslations("Admin.Bookings")
  const tCommon = useTranslations("Common")
  const [Filters, setFilters] = useState<useBookingFilters>({
    status: "",
  })
  const { BookingsLoading, bookings, fetch } = useBooking(Filters)
  const filteredBookings = bookings.filter((item) => item.status !== "EXPIRED")
  const [isOpen, setOpen] = useState(false)
  return (
    <TableComponent.Root>
      <BookingModal isOpen={isOpen} setOpen={setOpen} fetchBookings={fetch} />
      <TableComponent.TopRow
        title={t("title")}
        actionButton={[{ label: "Register Booking", onClick: () => setOpen(true) }]}
      />
      <TabsComponent
        tabs={[
          { value: "", text: t("tabs.all"), onClick: () => setFilters({ status: "" }) },
          { value: "CONFIRMED", text: t("tabs.confirmed"), onClick: () => setFilters({ status: "CONFIRMED" }) },
          { value: "CANCELED", text: t("tabs.cancelled"), onClick: () => setFilters({ status: "CANCELED" }) },
          { value: "EXPIRED", text: t("tabs.expired"), onClick: () => setFilters({ status: "EXPIRED" }) },
          { value: "COMPLETED", text: t("tabs.completed"), onClick: () => setFilters({ status: "COMPLETED" }) },
        ]}
        activeTab={Filters.status}
        setActiveTab={(tab) => setFilters({ status: tab as BookingStatus })}
      />
      <TableComponent.Grid
        itemsAmount={bookings.length}
        gridTemplateColumns="1fr 1fr 1fr 1fr 0.5fr"
        headers={[
          t("headers.hour"),
          t("headers.service"),
          t("headers.employees"),
          t("headers.status"),
          tCommon("Actions"),
        ]}
        loading={BookingsLoading}
      >
        {filteredBookings.length === 0 ? (
          <div className="py-10 text-center text-gray-500">{t("noPendingBookings")}</div>
        ) : (
          filteredBookings.map((item) => <Booking key={item.id} booking={item} fetch={fetch} />)
        )}
      </TableComponent.Grid>
    </TableComponent.Root>
  )
}
