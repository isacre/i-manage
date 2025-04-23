import { ServiceType } from "@/stores/service-store"
import React from "react"
import Row from "@/components/table/row"
import RowActions from "@/components/table/rowActions"

interface ServiceProps {
  service: ServiceType
  onEdit: () => void
  onDelete: () => void
}

export default function Service({ service, onEdit, onDelete }: ServiceProps) {
  return (
    <Row gridTemplateColumns="1fr 1fr 0.25fr">
      <div>{service.name}</div>
      <div>R${service.price}</div>
      <RowActions onEdit={onEdit} onDelete={onDelete} />
    </Row>
  )
}
