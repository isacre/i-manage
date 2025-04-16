import { ServiceType } from "@/stores/service-store";
import { Button, Table } from "@radix-ui/themes";

export default function Service({ service }: { service: ServiceType }) {
  return (
    <Table.Row>
      <Table.Cell>{service.name}</Table.Cell>
      <Table.Cell>{service.price}</Table.Cell>
      <Table.Cell>
        <Button color="tomato" className="bg-red-600 text-white rounded-full">
          Editar
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button color="tomato" className="bg-red-600 text-white rounded-full">
          Excluir
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
