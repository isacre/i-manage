import React from "react"
import { CheckCircle, CreditCard, Calendar, MapPin, Clock, User, Building2 } from "lucide-react"

export interface PaymentDetailsType {
  amount: string
  currency: string
  paymentMethod: string
  transactionId: string
  date: string
  time: string
  customerName: string
  storeName: string
}

export const createMockPaymentDetails = (sessionId: string | null): PaymentDetailsType => ({
  amount: "150,00",
  currency: "BRL",
  paymentMethod: "Cartão de Crédito",
  transactionId: sessionId || "pi_1234567890",
  date: new Date().toLocaleDateString("pt-BR"),
  time: new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  customerName: "João Silva",
  storeName: "Loja Exemplo Ltda",
})

export default function PaymentDetailsComponent({ paymentDetails }: { paymentDetails: PaymentDetailsType | null }) {
  return (
    <div className="mb-8 rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Detalhes da Transação</h2>
        <div className="flex items-center space-x-2 rounded-full bg-green-100 px-3 py-1">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-green-700">Pago</span>
        </div>
      </div>
      <div className="mb-8 text-center">
        <div className="mb-2 text-4xl font-bold text-gray-900">R$ {paymentDetails?.amount}</div>
        <p className="text-gray-500">Valor total pago</p>
      </div>
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 py-3">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Nome do Cliente</span>
          </div>
          <span className="font-medium text-gray-900">{paymentDetails?.customerName}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-100 py-3">
          <div className="flex items-center space-x-3">
            <Building2 className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Nome da Loja</span>
          </div>
          <span className="font-medium text-gray-900">{paymentDetails?.storeName}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-100 py-3">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Método de Pagamento</span>
          </div>
          <span className="font-medium text-gray-900">{paymentDetails?.paymentMethod}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-100 py-3">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Data</span>
          </div>
          <span className="font-medium text-gray-900">{paymentDetails?.date}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-100 py-3">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Horário</span>
          </div>
          <span className="font-medium text-gray-900">{paymentDetails?.time}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">ID da Transação</span>
          </div>
          <span className="font-mono text-sm text-gray-500">{paymentDetails?.transactionId}</span>
        </div>
      </div>
      <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div>
            <p className="mb-1 font-medium text-green-800">Reserva Confirmada</p>
            <p className="text-sm text-green-700">
              Você receberá um email de confirmação com todos os detalhes da sua reserva.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
