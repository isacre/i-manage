"use client"
import useServices from "@/hooks/useServices"
import { useState } from "react"
import Service from "./service"
import RegisterServiceModal from "./modals/register"
import EditServiceModal from "./modals/edit"
import DeleteServiceModal from "./modals/delete"
import Table from "@/components/table"
import { ServiceType } from "@/stores/service-store"
import TableComponent from "@/components/table"

export default function Services() {
  const { services, servicesLoading } = useServices()
  const [addServiceIsOpen, setAddServiceIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  function handleEditService(service: ServiceType) {
    setSelectedService(service)
    setIsEditModalOpen(true)
  }

  function handleDeleteService(service: ServiceType) {
    setSelectedService(service)
    setIsDeleteModalOpen(true)
  }

  return (
    <div>
      <RegisterServiceModal AddServiceIsOpen={addServiceIsOpen} setAddServiceIsOpen={setAddServiceIsOpen} />
      {selectedService && (
        <>
          <EditServiceModal isOpen={isEditModalOpen} setOpen={setIsEditModalOpen} service={selectedService} />
          <DeleteServiceModal isOpen={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} service={selectedService} />
        </>
      )}
      <TableComponent.Root>
        <TableComponent.TopRow
          title="Serviços"
          actionButton={{ label: "Adicionar Serviço", onClick: () => setAddServiceIsOpen(true) }}
        />
        <TableComponent.Grid
          headers={["Nome", "Preço", "Ações"]}
          loading={servicesLoading}
          gridTemplateColumns="1fr 1fr 0.25fr"
        >
          {services.map((service) => (
            <Service
              key={service.id}
              service={service}
              onEdit={() => handleEditService(service)}
              onDelete={() => handleDeleteService(service)}
            />
          ))}
        </TableComponent.Grid>
      </TableComponent.Root>
    </div>
  )
}
