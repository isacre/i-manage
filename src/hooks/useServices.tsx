import { getServices } from "@/services/company/services"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function useServices(companyId: number | undefined) {
  const { services, update } = useServiceStore()
  const { user } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  function fetch() {
    if (!companyId) {
      return
    }
    setIsLoading(true)
    getServices(companyId)
      .then((services) => {
        update(services)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error("Erro ao buscar serviços")
      })
  }
  useEffect(() => {
    fetch()
  }, [user, companyId])

  return { services, servicesLoading: isLoading }
}
