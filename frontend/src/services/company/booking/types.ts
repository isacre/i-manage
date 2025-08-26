export interface PaymentDetails {
  amount: number
  currency: string
  status: string
  payment_method: string
  payment_id: string
  timestamp: string
}

export interface BookingBySessionIdResponse {
  id: number
  client_name: string
  payment_details: PaymentDetails
  store_name: string
}
