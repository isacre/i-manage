"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import PaymentDetailsComponent, { createMockPaymentDetails, PaymentDetailsType } from "./paymentDetails"
import PaymentStatus from "./paymentStatus"
import PaymentActions from "./paymentActions"
import { completeBookingAfterPayment, getBookingBySessionId } from "@/services/company/booking"
import { toast } from "react-toastify"

export default function SuccessPage() {
  const sessionId = useSearchParams().get("session_id")
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      return
    }
    setIsLoading(true)
    getBookingBySessionId(sessionId)
      .then((res) => {
        console.log(res)
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
