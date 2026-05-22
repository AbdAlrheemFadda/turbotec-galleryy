export interface CarSpec {
  year: number;
  acceleration: string;
  horsepower: number;
  color: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'super-sport' | 'electric' | 'grand-touring' | 'luxury-suv' | 'motorcycle';
  price: number;
  image: string;
  specs: CarSpec;
  rentPrice?: number;
}

export const INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: '911 CARRERA S',
    category: 'super-sport',
    price: 148500,
    rentPrice: 450,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    specs: { year: 2024, acceleration: '4.5s', horsepower: 503, color: 'HERITAGE SILVER' }
  },
  {
    id: '2',
    name: 'F8 TRIBUTO',
    category: 'super-sport',
    price: 276000,
    rentPrice: 850,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80',
    specs: { year: 2024, acceleration: '4.5s', horsepower: 503, color: 'HERITAGE SILVER' }
  },
  {
    id: '3',
    name: 'RS E-TRON GT',
    category: 'electric',
    price: 139900,
    rentPrice: 550,
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80',
    specs: { year: 2024, acceleration: '4.5s', horsepower: 503, color: 'HERITAGE SILVER' }
  },
  {
    id: '4',
    name: 'VANTAGE V8',
    category: 'grand-touring',
    price: 165500,
    rentPrice: 750,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    specs: { year: 2024, acceleration: '4.5s', horsepower: 503, color: 'HERITAGE SILVER' }
  },
  {
    id: '5',
    name: 'CAYMAN GT4',
    category: 'super-sport',
    price: 102500,
    rentPrice: 350,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
    specs: { year: 2024, acceleration: '4.5s', horsepower: 503, color: 'HERITAGE SILVER' }
  },
  {
    id: '6',
    name: 'HURACÁN ST',
    category: 'super-sport',
    price: 104500,
    rentPrice: 900,
    image: '/classical.webp',
    specs: { year: 2024, acceleration: '4.5s', horsepower: 503, color: 'HERITAGE SILVER' }
  }
];

export const MOTORCYCLES: InventoryItem[] = [
  {
    id: 'm1',
    name: 'PHANTOM X-Rider',
    category: 'motorcycle',
    price: 32500,
    image: '/phantom_xrider.webp',
    specs: { year: 2024, acceleration: '3.2s', horsepower: 215, color: 'MATTE BLACK' }
  },
  {
    id: 'm2',
    name: 'STREET FIGHTER',
    category: 'motorcycle',
    price: 28900,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    specs: { year: 2024, acceleration: '3.0s', horsepower: 208, color: 'CARBON BLUE' }
  },
  {
    id: 'm3',
    name: 'PANIGALE V4 S',
    category: 'motorcycle',
    price: 33500,
    image: '/luxury_motorcycle.webp',
    specs: { year: 2024, acceleration: '2.9s', horsepower: 214, color: 'ROSSO CORSA' }
  },
  {
    id: 'm4',
    name: 'RUSH 1000',
    category: 'motorcycle',
    price: 45000,
    image: '/luxury_motorcycle_hover.webp',
    specs: { year: 2024, acceleration: '2.8s', horsepower: 208, color: 'TITANIUM GREY' }
  },
  {
    id: 'm5',
    name: 'R1M CARBON',
    category: 'motorcycle',
    price: 27500,
    image: '/luxury_moto.webp',
    specs: { year: 2024, acceleration: '3.1s', horsepower: 200, color: 'LIQUID METAL' }
  },
  {
    id: 'm6',
    name: 'NINJA H2R',
    category: 'motorcycle',
    price: 56500,
    image: '/featured_phantom.webp',
    specs: { year: 2024, acceleration: '2.5s', horsepower: 310, color: 'MIRROR COATED' }
  }
];

export const ASSETS = {
  homeHero: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&w=1920&q=80',
  carHero: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
  rentHero: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1920&q=80',
  motoHero: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1920&q=80',
};

