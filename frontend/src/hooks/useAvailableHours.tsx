import { getAvailableHours } from "@/services/company/services"
import { useEffect, useState } from "react"

export function useAvailableHours(
  selectedProduct: number | null,
  clickedDate: string,
  selectedEmployee: string | undefined,
) {
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [capableEmployees, setCapableEmployees] = useState<{ id: number; name: string; email: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function fetch(skipLoading: boolean = false) {
    if (selectedProduct === null) {
      return
    }
    if (!clickedDate) {
      return
    }
    if (!skipLoading) {
      setIsLoading(true)
    }
    getAvailableHours(selectedProduct, clickedDate, selectedEmployee)
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
  }, [selectedProduct, clickedDate, selectedEmployee])

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(true)
    }, 10000)
    return () => clearInterval(interval)
  }, [selectedProduct, clickedDate, selectedEmployee])

  return { availableHours, capableEmployees, isLoading }
}
