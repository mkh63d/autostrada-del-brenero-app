export default defineNuxtPlugin(async () => {
  if (import.meta.client) {
    const { attractions, loadAttractions, addAttraction } = useAttractions();
    
    await loadAttractions();
    
    if (attractions.value.length === 0) {
      console.log('Initializing database with sample data...');
      
      const samples = [
        {
          name: 'MUSE - Museo delle Scienze',
          description: 'Nowoczesne muzeum nauki zaprojektowane przez Renzo Piano. Interaktywne wystawy dotyczące nauk przyrodniczych, technologii i zrównoważonego rozwoju.',
          type: 'museum' as const,
          address: 'Corso del Lavoro e della Scienza, 3, 38122 Trento',
          phone: '+39 0461 270311',
          website: 'https://www.muse.it',
          openingHours: 'Wt-Nd: 10:00-18:00',
          price: '€11 dorośli, €9 ulgowy',
          latitude: 46.0659,
          longitude: 11.1210,
          autostradeExit: 'Trento Centro (A22)',
          distanceFromExit: 2.5
        },
        {
          name: 'Castello del Buonconsiglio',
          description: 'Zabytkowy zamek i muzeum sztuki. Dawna rezydencja książąt-biskupów z wspaniałymi freskami i kolekcjami sztuki średniowiecznej.',
          type: 'museum' as const,
          address: 'Via Bernardo Clesio, 5, 38122 Trento',
          phone: '+39 0461 233770',
          website: 'https://www.buonconsiglio.it',
          openingHours: 'Wt-Nd: 10:00-18:00',
          price: '€10 dorośli, €8 ulgowy',
          latitude: 46.0733,
          longitude: 11.1258,
          autostradeExit: 'Trento Centro (A22)',
          distanceFromExit: 1.8
        },
        {
          name: 'Piazza Duomo',
          description: 'Historyczny główny plac Trydentu z piękną katedrą, fontanną Neptuna i kolorowymi budynkami z freskami.',
          type: 'experience' as const,
          address: 'Piazza Duomo, 38122 Trento',
          openingHours: 'Całodobowo',
          price: 'Bezpłatnie',
          latitude: 46.0679,
          longitude: 11.1211,
          autostradeExit: 'Trento Centro (A22)',
          distanceFromExit: 1.5
        },
        {
          name: 'Monte Bondone',
          description: 'Ośrodek górski oferujący narciarstwo zimą i piesze wędrówki latem. Kolejka linowa, wspaniałe alpejskie widoki, ogród botaniczny.',
          type: 'experience' as const,
          address: 'Monte Bondone, 38123 Trento',
          phone: '+39 0461 947128',
          website: 'https://www.ski.montebondone.it',
          openingHours: 'Kolejka: 8:30-17:00',
          price: 'Kolejka: €10-15, Karnet: €30-40',
          latitude: 46.0147,
          longitude: 11.0464,
          autostradeExit: 'Trento Centro (A22)',
          distanceFromExit: 18.5
        },
        {
          name: 'Lago di Garda',
          description: 'Największe jezioro we Włoszech, 30 km od Trydentu. Sport wodne, plaże, malownicze miasteczka wokół jeziora.',
          type: 'experience' as const,
          address: 'Riva del Garda, 38066 TN',
          phone: '+39 0464 554444',
          website: 'https://www.visitgarda.com',
          openingHours: 'Całodobowo',
          price: 'Bezpłatny wstęp do jeziora',
          latitude: 45.8844,
          longitude: 10.8406,
          autostradeExit: 'Rovereto Sud (A22)',
          distanceFromExit: 22.0
        }
      ];
      
      for (const data of samples) {
        await addAttraction(data);
      }
      
      console.log('✓ Sample data loaded successfully!');
    }
  }
});
