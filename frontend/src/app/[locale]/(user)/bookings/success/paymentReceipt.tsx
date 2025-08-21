"use client"

import React from "react"
import { PaymentDetailsType } from "./paymentDetails"
import { PDFDownloadButton } from "./PDFUtils"

interface PaymentReceiptProps {
  paymentDetails: PaymentDetailsType | null
}

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ paymentDetails }) => {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg" id="receipt">
      <div className="border-b-2 border-emerald-500 py-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-emerald-500">RECIBO DE PAGAMENTO</h1>
        <p className="text-lg text-gray-500">iManage - Sistema de Gestão</p>
      </div>
      <div className="p-8">
        <div className="mb-6">
          <h3 className="mb-3 text-xl font-semibold text-gray-700">Dados da Loja</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Nome:</span> {paymentDetails?.storeName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Data:</span> {paymentDetails?.date}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Horário:</span> {paymentDetails?.time}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-3 text-xl font-semibold text-gray-700">Dados do Cliente</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Nome:</span> {paymentDetails?.customerName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">ID da Transação:</span> {paymentDetails?.transactionId}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-3 text-xl font-semibold text-gray-700">Detalhes do Pagamento</h3>
          <div className="mb-4 rounded-lg bg-gray-50 p-6 text-center">
            <p className="mb-2 text-sm text-gray-500">Valor Total Pago</p>
            <h2 className="text-4xl font-bold text-emerald-500">R$ {paymentDetails?.amount}</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Método de Pagamento:</span> {paymentDetails?.paymentMethod}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Moeda:</span> {paymentDetails?.currency}
            </p>
          </div>
        </div>

        {/* PDF Download Button */}
        <div className="mb-6 text-center">
          <PDFDownloadButton
            paymentDetails={paymentDetails}
            className="inline-flex items-center rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-emerald-600"
          >
            📄 Baixar PDF
          </PDFDownloadButton>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="mb-1 text-sm text-gray-500">Este é um recibo eletrônico válido</p>
          <p className="mb-1 text-sm text-gray-500">Em caso de dúvidas, entre em contato: suporte@imanage.com</p>
          <p className="text-sm text-gray-500">Gerado em: {new Date().toLocaleString("pt-BR")}</p>
        </div>
      </div>
    </div>
  )
}
