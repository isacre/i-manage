import { Button } from "@/components/ui/button"
import { BookingBySessionIdResponse } from "@/services/company/booking/types"
import { ArrowRight, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { PDFDownloadButton } from "./PDFUtils"

interface PaymentActionsProps {
  paymentDetails: BookingBySessionIdResponse | null
}

export default function PaymentActions({ paymentDetails }: PaymentActionsProps) {
  const navigate = useRouter()

  const handleViewBookings = () => {
    navigate.push("/bookings")
  }

  return (
    <>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          onClick={handleViewBookings}
          className="flex items-center space-x-2 rounded-lg bg-green-600 px-8 py-3 font-medium text-white hover:bg-green-700"
        >
          <span>Ver Minhas Reservas</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <PDFDownloadButton paymentDetails={paymentDetails}>
          <Button
            variant="outline"
            className="flex items-center space-x-2 rounded-lg border-gray-300 px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            <span>Baixar Recibo</span>
          </Button>
        </PDFDownloadButton>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Precisa de ajuda? Entre em contato conosco em{" "}
          <a href="mailto:suporte@imanage.com" className="text-green-600 underline hover:text-green-700">
            suporte@imanage.com
          </a>
        </p>
      </div>
    </>
  )
}
