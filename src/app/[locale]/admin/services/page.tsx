"use client";
import useServices from "@/hooks/useServices";
import { Button, Table } from "@radix-ui/themes";
import { useState } from "react";
import Service from "./service";
import RegisterServiceModal from "./modals/register";

export default function Services() {
  const { services } = useServices();
  const [addServiceIsOpen, setAddServiceIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl font-bold">Serviços</h1>
        <Button color="tomato" onClick={() => setAddServiceIsOpen(true)}>
          Adicionar Serviço
        </Button>
      </div>
      <RegisterServiceModal AddServiceIsOpen={addServiceIsOpen} setAddServiceIsOpen={setAddServiceIsOpen} />
      <Table.Root className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Preço</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Editar</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Excluir</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {services.map((service) => (
            <Service key={service.id} service={service} />
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
