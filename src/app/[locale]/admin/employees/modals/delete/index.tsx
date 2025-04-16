"use client";
import Modal from "@/components/modal";
import { deleteEmployee } from "@/services/admin/employee";
import { useEmployeeStore } from "@/stores/employee-store";
import { useUserStore } from "@/stores/user-store";
import { Button } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { EmployeeType } from "@/stores/employee-store";

export default function DeleteEmployeeModal({ isOpen, setOpen, employee }: { isOpen: boolean; setOpen: (open: boolean) => void; employee: EmployeeType }) {
  const remove = useEmployeeStore((state) => state.remove);
  const user = useUserStore((state) => state.user);

  function handleDelete() {
    if (!user?.company?.id) return;

    deleteEmployee(employee.id.toString(), user.company.id)
      .then(() => {
        setOpen(false);
        toast.success("Funcionário excluído com sucesso");
        remove(employee.id);
      })
      .catch(() => {
        toast.error("Erro ao excluir funcionário");
      });
  }

  return (
    <div>
      <Modal isOpen={isOpen} setOpen={setOpen} title="Excluir Funcionário">
        <div className="space-y-6 p-2">
          <p className="text-gray-700">
            Tem certeza que deseja excluir o funcionário <span className="font-semibold">{employee.name}</span>? Esta ação não pode ser desfeita.
          </p>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="soft" color="gray" onClick={() => setOpen(false)} className="px-4 py-2">
              Cancelar
            </Button>
            <Button type="button" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-200" onClick={handleDelete}>
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
