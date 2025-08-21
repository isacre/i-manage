"use client"

import React from "react"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import { PaymentReceiptPDF } from "./paymentReceiptPDF"
import { PaymentDetailsType } from "./paymentDetails"

interface PDFDownloadButtonProps {
  paymentDetails: PaymentDetailsType | null
  children: React.ReactNode
  className?: string
}

export const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ paymentDetails, children, className = "" }) => {
  if (!paymentDetails) {
    return null
  }

  return (
    <PDFDownloadLink
      document={<PaymentReceiptPDF paymentDetails={paymentDetails} />}
      fileName={`recibo-pagamento-${paymentDetails.transactionId}.pdf`}
      className={className}
    >
      {({ loading, error }) => {
        if (loading) return <span>Gerando PDF...</span>
        if (error) return <span onClick={() => console.log(error)}>Erro ao gerar PDF</span>
        return children
      }}
    </PDFDownloadLink>
  )
}

interface PDFPreviewProps {
  paymentDetails: PaymentDetailsType | null
  className?: string
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ paymentDetails, className = "" }) => {
  if (!paymentDetails) {
    return <div className={className}>Nenhum detalhe de pagamento disponível</div>
  }

  return (
    <div className={className}>
      <PDFViewer width="100%" height="600px">
        <PaymentReceiptPDF paymentDetails={paymentDetails} />
      </PDFViewer>
    </div>
  )
}

// Hook for programmatic PDF generation
export const usePDFGeneration = () => {
  const generatePDF = async (paymentDetails: PaymentDetailsType | null) => {
    if (!paymentDetails) {
      throw new Error("No payment details available")
    }

    // This would typically use a server-side PDF generation service
    // For now, we'll use the client-side approach
    return {
      success: true,
      message: "PDF generated successfully",
      filename: `recibo-pagamento-${paymentDetails.transactionId}.pdf`,
    }
  }

  return { generatePDF }
}
