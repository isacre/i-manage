import { getEmployees } from "@/services/company/employee"
import { useEmployeeStore } from "@/stores/employee-store"
import { useUserStore } from "@/stores/user-store"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function useEmployees() {
  const { employees, update } = useEmployeeStore()
  const { user } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  function fetch() {
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
  }
  useEffect(() => {
    fetch()
  }, [user])

  return { employees, employeesLoading: isLoading }
}
