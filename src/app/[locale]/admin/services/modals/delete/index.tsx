"use client"
import Modal from "../../../../../../components/modal"
import { deleteService } from "../../../../../../services/company/services"
import { useServiceStore } from "../../../../../../stores/service-store"
import { useUserStore } from "../../../../../../stores/user-store"
import { Button } from "@radix-ui/themes"
import { toast } from "react-toastify"
import { ServiceType } from "../../../../../../stores/service-store"
import { useTranslations } from "next-intl"

interface DeleteServiceModalProps {
  isOpen: boolean
  setOpen: (open: boolean) => void
  service: ServiceType | null
}

export default function DeleteServiceModal({ isOpen, setOpen, service }: DeleteServiceModalProps) {
  const remove = useServiceStore((state) => state.remove)
  const user = useUserStore((state) => state.user)
  const t = useTranslations("Admin.Services")
  const tCommon = useTranslations("Common")

  function handleDelete() {
    if (!user?.company?.id || !service?.id) return

    deleteService(service.id.toString())
      .then(() => {
        setOpen(false)
        toast.success(t("deleteSuccess"))
        remove(service.id)
      })
      .catch(() => {
        toast.error(t("deleteError"))
      })
  }

  return (
    <div>
      <Modal isOpen={isOpen} setOpen={setOpen} title={t("deleteTitle")}>
        <div className="space-y-6 p-2">
          <p className="text-gray-700">{t("deleteMessage", { name: service?.name })}</p>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="soft" color="gray" onClick={() => setOpen(false)} className="px-4 py-2">
              {tCommon("Cancel")}
            </Button>
            <Button
              type="button"
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-500"
              onClick={handleDelete}
            >
              {tCommon("Delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
