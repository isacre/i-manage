import { getAvailableHours } from "@/services/company/services"
import { useEffect, useState } from "react"

export function useAvailableHours(selectedProduct: number, clickedDate: string) {
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function fetch() {
    if (!clickedDate) {
      return
    }
    setIsLoading(true)
    getAvailableHours(selectedProduct, clickedDate)
      .then((data) => {
        setAvailableHours(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setAvailableHours([])
      })
  }

  useEffect(() => {
    fetch()
  }, [selectedProduct, clickedDate])

  return { availableHours, isLoading }
}
