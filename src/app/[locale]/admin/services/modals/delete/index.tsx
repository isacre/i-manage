"use client"
import Modal from "@/components/modal"
import { deleteService } from "@/services/admin/services"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { Button } from "@radix-ui/themes"
import { toast } from "react-toastify"
import { ServiceType } from "@/stores/service-store"

interface DeleteServiceModalProps {
  isOpen: boolean
  setOpen: (open: boolean) => void
  service: ServiceType | null
}

export default function DeleteServiceModal({ isOpen, setOpen, service }: DeleteServiceModalProps) {
  const remove = useServiceStore((state) => state.remove)
  const user = useUserStore((state) => state.user)

  function handleDelete() {
    if (!user?.company?.id || !service?.id) return

    deleteService(service.id.toString())
      .then(() => {
        setOpen(false)
        toast.success("Serviço excluído com sucesso")
        remove(service.id)
      })
      .catch(() => {
        toast.error("Erro ao excluir serviço")
      })
  }

  return (
    <div>
      <Modal isOpen={isOpen} setOpen={setOpen} title="Excluir Serviço">
        <div className="space-y-6 p-2">
          <p className="text-gray-700">
            Tem certeza que deseja excluir o serviço <span className="font-semibold">{service?.name}</span>? Esta ação
            não pode ser desfeita.
          </p>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="soft" color="gray" onClick={() => setOpen(false)} className="px-4 py-2">
              Cancelar
            </Button>
            <Button
              type="button"
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-500"
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
