"""
Management command to initialize the database with sample attractions.
Matches the initial data from the frontend IndexedDB.
"""

from django.core.management.base import BaseCommand
from attractions.models import Attraction


class Command(BaseCommand):
    help = 'Initialize the database with sample attractions (matches frontend IndexedDB data)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force initialization even if attractions already exist',
        )

    def handle(self, *args, **options):
        if Attraction.objects.exists() and not options['force']:
            self.stdout.write(
                self.style.WARNING(
                    'Attractions already exist. Use --force to reinitialize.'
                )
            )
            return

        if options['force']:
            Attraction.objects.all().delete()
            self.stdout.write(self.style.WARNING('Deleted existing attractions.'))

        samples = [
            {
                'name': 'MUSE - Museo delle Scienze',
                'description': 'Nowoczesne muzeum nauki zaprojektowane przez Renzo Piano. Interaktywne wystawy dotyczące nauk przyrodniczych, technologii i zrównoważonego rozwoju.',
                'type': 'museum',
                'address': 'Corso del Lavoro e della Scienza, 3, 38122 Trento',
                'phone': '+39 0461 270311',
                'website': 'https://www.muse.it',
                'opening_hours': 'Wt-Nd: 10:00-18:00',
                'price': '€11 dorośli, €9 ulgowy',
                'latitude': 46.0659,
                'longitude': 11.1210,
                'autostrade_exit': 'Trento Centro (A22)',
                'distance_from_exit': 2.5,
                'featured': True,
            },
            {
                'name': 'Castello del Buonconsiglio',
                'description': 'Zabytkowy zamek i muzeum sztuki. Dawna rezydencja książąt-biskupów z wspaniałymi freskami i kolekcjami sztuki średniowiecznej.',
                'type': 'museum',
                'address': 'Via Bernardo Clesio, 5, 38122 Trento',
                'phone': '+39 0461 233770',
                'website': 'https://www.buonconsiglio.it',
                'opening_hours': 'Wt-Nd: 10:00-18:00',
                'price': '€10 dorośli, €8 ulgowy',
                'latitude': 46.0733,
                'longitude': 11.1258,
                'autostrade_exit': 'Trento Centro (A22)',
                'distance_from_exit': 1.8,
                'featured': True,
            },
            {
                'name': 'Piazza Duomo',
                'description': 'Historyczny główny plac Trydentu z piękną katedrą, fontanną Neptuna i kolorowymi budynkami z freskami.',
                'type': 'experience',
                'address': 'Piazza Duomo, 38122 Trento',
                'opening_hours': 'Całodobowo',
                'price': 'Bezpłatnie',
                'latitude': 46.0679,
                'longitude': 11.1211,
                'autostrade_exit': 'Trento Centro (A22)',
                'distance_from_exit': 1.5,
            },
            {
                'name': 'Monte Bondone',
                'description': 'Ośrodek górski oferujący narciarstwo zimą i piesze wędrówki latem. Kolejka linowa, wspaniałe alpejskie widoki, ogród botaniczny.',
                'type': 'experience',
                'address': 'Monte Bondone, 38123 Trento',
                'phone': '+39 0461 947128',
                'website': 'https://www.ski.montebondone.it',
                'opening_hours': 'Kolejka: 8:30-17:00',
                'price': 'Kolejka: €10-15, Karnet: €30-40',
                'latitude': 46.0147,
                'longitude': 11.0464,
                'autostrade_exit': 'Trento Centro (A22)',
                'distance_from_exit': 18.5,
            },
            {
                'name': 'Lago di Garda',
                'description': 'Największe jezioro we Włoszech, 30 km od Trydentu. Sport wodne, plaże, malownicze miasteczka wokół jeziora.',
                'type': 'experience',
                'address': 'Riva del Garda, 38066 TN',
                'phone': '+39 0464 554444',
                'website': 'https://www.visitgarda.com',
                'opening_hours': 'Całodobowo',
                'price': 'Bezpłatny wstęp do jeziora',
                'latitude': 45.8844,
                'longitude': 10.8406,
                'autostrade_exit': 'Rovereto Sud (A22)',
                'distance_from_exit': 22.0,
            },
        ]

        for data in samples:
            Attraction.objects.create(**data)
            self.stdout.write(f'  ✓ Created: {data["name"]}')

        self.stdout.write(
            self.style.SUCCESS(
                f'\nSuccessfully initialized {len(samples)} sample attractions!'
            )
        )
