"use client"
import TableComponent from "@/components/table"
import useBooking, { useBookingFilters } from "@/hooks/useBooking"
import React, { useState } from "react"
import Booking from "./booking"
import TabsComponent from "@/components/tabs"
import { BookingStatus } from "@/stores/booking-store"
import { useTranslations } from "next-intl"

export default function Bookings() {
  const t = useTranslations("Admin.Bookings")
  const tCommon = useTranslations("Common")
  const [Filters, setFilters] = useState<useBookingFilters>({
    status: "PENDING",
  })
  const { BookingsLoading, bookings, fetch } = useBooking(Filters)
  const filteredBookings = bookings.filter((item) => item.status !== "EXPIRED")
  return (
    <TableComponent.Root>
      <TableComponent.TopRow title={t("title")} />
      <TabsComponent
        tabs={[
          { value: "PENDING", text: t("tabs.pending"), onClick: () => setFilters({ status: "PENDING" }) },
          { value: "", text: t("tabs.all"), onClick: () => setFilters({ status: "" }) },
          { value: "CONFIRMED", text: t("tabs.confirmed"), onClick: () => setFilters({ status: "CONFIRMED" }) },
          { value: "CANCELED", text: t("tabs.cancelled"), onClick: () => setFilters({ status: "CANCELED" }) },
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
