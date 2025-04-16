"use client";
import useServices from "@/hooks/useServices";
import { useState } from "react";
import Service from "./service";
import RegisterServiceModal from "./modals/register";
import EditServiceModal from "./modals/edit";
import DeleteServiceModal from "./modals/delete";
import Table from "@/components/table";
import { ServiceType } from "@/stores/service-store";

export default function Services() {
  const { services, servicesLoading } = useServices();
  const [addServiceIsOpen, setAddServiceIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div>
      <RegisterServiceModal AddServiceIsOpen={addServiceIsOpen} setAddServiceIsOpen={setAddServiceIsOpen} />
      {selectedService && (
        <>
          <EditServiceModal isOpen={isEditModalOpen} setOpen={setIsEditModalOpen} service={selectedService} />
          <DeleteServiceModal isOpen={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} service={selectedService} />
        </>
      )}
      <Table
        loading={servicesLoading}
        headers={["Nome", "Preço", "Ações"]}
        data={services}
        title="Serviços"
        actionButton={{ label: "Adicionar Serviço", onClick: () => setAddServiceIsOpen(true) }}
      >
        {services.map((service) => (
          <Service
            key={service.id}
            service={service}
            onEdit={() => {
              setSelectedService(service);
              setIsEditModalOpen(true);
            }}
            onDelete={() => {
              setSelectedService(service);
              setIsDeleteModalOpen(true);
            }}
          />
        ))}
      </Table>
    </div>
  );
}
