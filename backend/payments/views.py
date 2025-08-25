import stripe
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import api.integrations.google_calendar.service as google_calendar
from api.models.booking import Booking, BookingStatus
from users.models import User
from .models import Payment

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.headers.get("stripe-signature")
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"] 
        customer = User.objects.get(email=session.get("customer_email"))
        payment, _ = Payment.objects.update_or_create(
            stripe_payment_id=session.get("payment_intent"),
            defaults={
                "customer_id": customer.id,
                "amount": session.get("amount_total", 0),
                "currency": session.get("currency", "usd"),
                "status": session.get("payment_status"),
                "payment_method": session.get("payment_method_types", [""])[0],
            },
        )
        booking = Booking.objects.get(session_id=session.get("id"))
        booking.status = BookingStatus.CONFIRMED.value
        booking.payment = payment
        booking.save() 
        google_calendar.create_event(booking)
    elif event["type"] == "payment_intent.succeeded":
        intent = event["data"]["object"]
        Payment.objects.update_or_create(
            stripe_payment_id=intent["id"],
            defaults={
                "customer_id": intent.get("customer"),
                "amount": intent.get("amount", 0),
                "currency": intent.get("currency", "usd"),
                "status": intent.get("status"),
                "payment_method": intent.get("payment_method"),
            },
        )

    return HttpResponse(status=200)
