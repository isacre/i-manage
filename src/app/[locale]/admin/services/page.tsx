"use client"
import useServices from "../../../../hooks/useServices"
import { useState } from "react"
import Service from "./service"
import RegisterServiceModal from "./modals/register"
import EditServiceModal from "./modals/edit"
import DeleteServiceModal from "./modals/delete"
import { ServiceType } from "../../../../stores/service-store"
import TableComponent from "../../../../components/table"
import { useUserStore } from "../../../../stores/user-store"
import CapableEmployeesModal from "./modals/capableEmployees"
export default function Services() {
  const { user } = useUserStore()
  const { services, servicesLoading } = useServices(user?.company?.identifier)
  const [addServiceIsOpen, setAddServiceIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isCapableEmployeesModalOpen, setIsCapableEmployeesModalOpen] = useState(false)

  function handleEditServiceButton(service: ServiceType) {
    setSelectedService(service)
    setIsEditModalOpen(true)
  }

  function handleDeleteServiceButton(service: ServiceType) {
    setSelectedService(service)
    setIsDeleteModalOpen(true)
  }

  function handleEditCapableEmployeesButton(service: ServiceType) {
    setSelectedService(service)
    setIsCapableEmployeesModalOpen(true)
  }

  return (
    <div>
      <CapableEmployeesModal
        isOpen={isCapableEmployeesModalOpen}
        setOpen={setIsCapableEmployeesModalOpen}
        service={selectedService}
      />
      <RegisterServiceModal isOpen={addServiceIsOpen} setOpen={setAddServiceIsOpen} />
      <EditServiceModal isOpen={isEditModalOpen} setOpen={setIsEditModalOpen} service={selectedService} />
      <DeleteServiceModal isOpen={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} service={selectedService} />
      <TableComponent.Root>
        <TableComponent.TopRow
          title="Serviços"
          actionButton={[{ label: "Adicionar Serviço", onClick: () => setAddServiceIsOpen(true) }]}
        />
        <TableComponent.Grid
          itemsAmount={services.length}
          headers={["Nome", "Preço", "Funcionários", "Ações"]}
          loading={servicesLoading}
          gridTemplateColumns="1fr 1fr 1fr 0.25fr"
        >
          {services.map((service) => (
            <Service
              key={service.id}
              service={service}
              onEdit={() => handleEditServiceButton(service)}
              onDelete={() => handleDeleteServiceButton(service)}
              onCapableEmployees={() => handleEditCapableEmployeesButton(service)}
            />
          ))}
        </TableComponent.Grid>
      </TableComponent.Root>
    </div>
  )
}
