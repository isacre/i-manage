import { api } from ".."
import Stripe from "stripe"

export async function retrievePaymentUrlWithSessionId(
  session_id: string,
): Promise<{ valid: boolean; session: Stripe.Checkout.Session }> {
  const response = await api.get(`/booking/retrievePaymentUrlWithSessionId/`, { params: { session_id } })
  return response.data.url
}
