import { CheckCircle } from "lucide-react"

export default function PaymentStatus() {
  return (
    <div className="mb-8 text-center">
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Payment Confirmed!</h1>
      <p className="text-xl text-gray-600">Your payment has been processed successfully</p>
    </div>
  )
}
