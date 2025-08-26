"use client"

import { getBookingBySessionId } from "@/services/company/booking"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import PaymentActions from "./paymentActions"
import PaymentDetailsComponent, { PaymentDetailsType } from "./paymentDetails"
import PaymentStatus from "./paymentStatus"
import { BookingBySessionIdResponse } from "@/services/company/booking/types"

export default function SuccessPage() {
  const sessionId = useSearchParams().get("session_id")
  const [paymentDetails, setPaymentDetails] = useState<BookingBySessionIdResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      return
    }
    setIsLoading(true)
    getBookingBySessionId(sessionId)
      .then((res) => {
        setPaymentDetails(res)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-green-600"></div>
          <p className="text-lg text-green-700">Processando pagamento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <PaymentStatus />
        <PaymentDetailsComponent paymentDetails={paymentDetails} />
        <PaymentActions paymentDetails={paymentDetails} />
      </div>
    </div>
  )
}
