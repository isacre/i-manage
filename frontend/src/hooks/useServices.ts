import { getCompanyServices } from "@/services/company/services"
import { useServiceStore } from "@/stores/service-store"
import { useUserStore } from "@/stores/user-store"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"

export default function useServices(companyId: string | undefined) {
  const { services, update } = useServiceStore()
  const { user } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations()

  function fetch() {
    if (!companyId) {
      return
    }
    setIsLoading(true)
    getCompanyServices(companyId)
      .then((services) => {
        update(services)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(t("Company.errorFetchingServices"))
      })
  }
  useEffect(() => {
    fetch()
  }, [user, companyId])

  return { services, servicesLoading: isLoading, fetch }
}
