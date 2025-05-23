import { getAvailableHours } from "@/services/company/services"
import { useEffect, useState } from "react"

export function useAvailableHours(selectedProduct: number | null, clickedDate: string) {
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [capableEmployees, setCapableEmployees] = useState<{ id: number; name: string; email: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function fetch() {
    if (selectedProduct === null) {
      return
    }
    if (!clickedDate) {
      return
    }
    setIsLoading(true)
    getAvailableHours(selectedProduct, clickedDate)
      .then((data) => {
        setAvailableHours(data.available_slots)
        setCapableEmployees(data.capable_employees)
        setIsLoading(false)
      })
      .catch((err) => {
        setAvailableHours([])
      })
  }

  useEffect(() => {
    fetch()
  }, [selectedProduct, clickedDate])

  return { availableHours, capableEmployees, isLoading }
}
