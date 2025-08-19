"use client"
import { ServiceType } from "@/stores/service-store"
import React from "react"
import Row from "@/components/table/row"
import RowActions from "@/components/table/rowActions"
import { FaUsers } from "react-icons/fa"
import { useTranslations } from "next-intl"

interface ServiceProps {
  service: ServiceType
  onEdit: () => void
  onDelete: () => void
  onCapableEmployees: () => void
}

export default function Service({ service, onEdit, onDelete, onCapableEmployees }: ServiceProps) {
  const t = useTranslations("Admin.Services")

  return (
    <Row gridTemplateColumns="1fr 1fr 1fr 0.25fr">
      <div>{service.name}</div>
      <div>R${service.price}</div>
      <div>{service.capable_employees.map((employee) => employee.name).join(", ")}</div>
      <RowActions
        onEdit={onEdit}
        onDelete={onDelete}
        extraActions={[{ label: t("editEmployees"), onClick: onCapableEmployees, icon: <FaUsers /> }]}
      />
    </Row>
  )
}
