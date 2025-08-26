"use client"

import React from "react"
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"
import { PaymentDetailsType } from "./paymentDetails"
import { BookingBySessionIdResponse } from "@/services/company/booking/types"
import dayjs from "dayjs"

Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
})

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf", // Regular 400
})

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf", // Bold 700
  fontWeight: "bold",
})

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
})

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Roboto",
  },
  header: {
    borderBottom: "2px solid #10b981",
    paddingBottom: 32,
    marginBottom: 32,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 0,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4b5563",
    width: 120,
  },
  value: {
    fontSize: 14,
    color: "#4b5563",
    flex: 1,
  },
  amountBox: {
    backgroundColor: "#f9fafb",
    padding: 24,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: "center",
  },
  amountLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#10b981",
  },
  footer: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: 24,
    marginTop: 32,
    textAlign: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
})

interface PaymentReceiptPDFProps {
  paymentDetails: BookingBySessionIdResponse | null
}

export const PaymentReceiptPDF: React.FC<PaymentReceiptPDFProps> = ({ paymentDetails }) => {
  if (!paymentDetails) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No payment details available</Text>
        </Page>
      </Document>
    )
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>RECIBO DE PAGAMENTO</Text>
          <Text style={styles.subtitle}>iManage - Sistema de Gestão</Text>
        </View>

        {/* Store Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados da Loja</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{paymentDetails.store_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data:</Text>
            <Text style={styles.value}>{dayjs(paymentDetails.payment_details.timestamp).format("DD/MM/YYYY")}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Horário:</Text>
            <Text style={styles.value}>{dayjs(paymentDetails.payment_details.timestamp).format("HH:mm")}</Text>
          </View>
        </View>

        {/* Customer Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Cliente</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{paymentDetails.client_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ID da Transação:</Text>
            <Text style={styles.value}>{paymentDetails.payment_details.payment_id}</Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes do Pagamento</Text>
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>Valor Total Pago</Text>
            <Text style={styles.amountValue}>R$ {paymentDetails.payment_details.amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Método de Pagamento:</Text>
            <Text style={styles.value}>{paymentDetails.payment_details.payment_method}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Moeda:</Text>
            <Text style={styles.value}>{paymentDetails.payment_details.currency}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Este é um recibo eletrônico válido</Text>
          <Text style={styles.footerText}>Em caso de dúvidas, entre em contato: suporte@imanage.com</Text>
          <Text style={styles.footerText}>Gerado em: {new Date().toLocaleString("pt-BR")}</Text>
        </View>
      </Page>
    </Document>
  )
}

// Export for use with PDFDownloadLink or PDFViewer
export default PaymentReceiptPDF
