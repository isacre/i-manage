from django.core.management.base import BaseCommand
from django.utils.timezone import now
from api.models import Booking

class Command(BaseCommand):
    help = 'Completa agendamentos pendentes com data passada'

    def handle(self, *args, **kwargs):
        now_ = now()
        count = Booking.objects.filter(
            status='CONFIRMED',
            end_date__lt=now()
        ).update(status='COMPLETED')
        if count > 0:
            self.stdout.write(f'[DEBUG] {count} bookings encontrados para completar')
            self.stdout.write(f'{count} agendamentos completados.')
        