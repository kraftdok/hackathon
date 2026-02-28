export interface Product {
  id: string;
  name: string;
  price: string;
  link: string;
  description: string;
  category: 'accommodation' | 'dining' | 'activity' | 'transport';
}

export interface Stop {
  id: string;
  title: string;
  location: string;
  narrative: string;
  day: number;
  image: string;
  products: Product[];
}

export interface World {
  id: string;
  name: string;
  description: string;
  aesthetic: string;
  voice: string;
  stops: Stop[];
}

export interface RemixRequest {
  originalWorld: World;
  userInput: string;
}
