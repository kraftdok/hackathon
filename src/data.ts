import { World } from './types';

export const EUROPEAN_SUMMER_WORLD: World = {
  id: 'euro-summer-001',
  name: 'European Summer: The Grand Tour',
  description: 'A sun-drenched odyssey through the most iconic coastal gems and cultural capitals of Europe.',
  aesthetic: 'Golden hour, linen shirts, sparkling turquoise waters, and ancient stone.',
  voice: 'Sophisticated, evocative, and deeply romantic.',
  stops: [
    {
      id: 'stop-1',
      title: 'Positano: Vertical Dreams',
      location: 'Amalfi Coast, Italy',
      narrative: 'Wake up to the sound of the Tyrrhenian Sea. Positano is a pastel-colored dream cascading down the cliffs. Spend your morning wandering the narrow alleys before a private boat tour of the hidden grottos.',
      day: 1,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      products: [
        {
          id: 'p1',
          name: 'Le Sirenuse',
          price: '€1,200/night',
          link: '#',
          description: 'An iconic luxury hotel with unparalleled views of the bay.',
          category: 'accommodation'
        },
        {
          id: 'p2',
          name: 'Da Adolfo Boat Transfer',
          price: '€20',
          link: '#',
          description: 'A rustic boat ride to a secluded beach club for the best pasta alle vongole.',
          category: 'transport'
        }
      ]
    },
    {
      id: 'stop-2',
      title: 'Santorini: The Caldera Sunset',
      location: 'Oia, Greece',
      narrative: 'The white-washed walls of Oia glow in the setting sun. This is the heart of the Aegean. Explore the volcanic beaches by day and retreat to your private infinity pool as the sky turns violet.',
      day: 2,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      products: [
        {
          id: 'p3',
          name: 'Canaves Oia Suites',
          price: '€950/night',
          link: '#',
          description: 'Ultimate luxury carved into the volcanic rock.',
          category: 'accommodation'
        },
        {
          id: 'p4',
          name: 'Private Catamaran Cruise',
          price: '€450',
          link: '#',
          description: 'Sail around the caldera with a private chef and snorkeling stops.',
          category: 'activity'
        }
      ]
    },
    {
      id: 'stop-3',
      title: 'St. Tropez: Riviera Glamour',
      location: 'French Riviera, France',
      narrative: 'The birthplace of modern chic. St. Tropez is where the jet set meets the old world. Spend your afternoon at Pampelonne Beach before an evening of people-watching at the port.',
      day: 3,
      image: 'https://images.unsplash.com/photo-1539717413143-649c35d62976?auto=format&fit=crop&w=800&q=80',
      products: [
        {
          id: 'p5',
          name: 'Byblos Saint-Tropez',
          price: '€800/night',
          link: '#',
          description: 'A legendary palace hotel in the heart of the village.',
          category: 'accommodation'
        },
        {
          id: 'p6',
          name: 'Club 55 Lunch',
          price: '€150',
          link: '#',
          description: 'The most famous beach club on the Riviera.',
          category: 'dining'
        }
      ]
    },
    {
      id: 'stop-4',
      title: 'Ibiza: Bohemian Spirit',
      location: 'Balearic Islands, Spain',
      narrative: 'Beyond the clubs lies a serene, mystical island. Discover hidden calas with crystal water and organic farms serving the freshest Mediterranean fare.',
      day: 4,
      image: 'https://images.unsplash.com/photo-1512753360413-95204773f744?auto=format&fit=crop&w=800&q=80',
      products: [
        {
          id: 'p7',
          name: 'Six Senses Ibiza',
          price: '€1,100/night',
          link: '#',
          description: 'Sustainable luxury on the northern tip of the island.',
          category: 'accommodation'
        }
      ]
    }
  ]
};
