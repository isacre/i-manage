import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

def create_checkout_session(service_name: str, service_description: str, amount: int, customer_email: str, metadata: dict = {}):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "brl",
                    "product_data": {
                        "name": service_name,
                        "description": service_description,
                    },
                    "unit_amount": int(amount),  # em centavos
                },
                "quantity": 1,
            }],
            mode="payment",
            customer_email=customer_email,
            success_url=f"{settings.DOMAIN}/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{settings.DOMAIN}/cancel",
            metadata=metadata,
        )
        return session
    except Exception as e:
        raise e
