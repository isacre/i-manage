import { getEmployees } from "@/services/company/employee"
import { useEmployeeStore } from "@/stores/employee-store"
import { useUserStore } from "@/stores/user-store"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function useEmployees(fetchOnRender = true) {
  const { employees, update } = useEmployeeStore()
  const { user } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const fetch = useCallback(() => {
    if (!user?.company?.id) {
      return
    }
    setIsLoading(true)
    getEmployees(user.company.id)
      .then((employees) => {
        update(employees)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error("Erro ao buscar funcionários")
      })
  }, [user?.company?.id, update])

  useEffect(() => {
    if (fetchOnRender) {
      fetch()
    }
  }, [user?.company?.id, fetchOnRender])

  return { employees, employeesLoading: isLoading, fetch }
}
