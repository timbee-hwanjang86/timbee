
import { Product, SiteConfig } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NEOFECT Smart Glove',
    category: 'Rehabilitation',
    brand: 'NEOFECT',
    description: 'High-tech rehabilitation device for stroke survivors and hand injury patients.',
    price: '$1,299.00',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    amazonUrl: 'https://amazon.com'
  },
  {
    id: '2',
    name: 'UPWELLY Lumbar Support',
    category: 'Back Support',
    brand: 'UPWELLY',
    description: 'Orthopedic grade back support designed for all-day comfort and postural correction.',
    price: '$45.00',
    imageUrl: 'https://images.unsplash.com/photo-1594731164628-d70aa5582175?auto=format&fit=crop&q=80&w=800',
    amazonUrl: 'https://amazon.com'
  },
  {
    id: '3',
    name: 'NEOFECT Drop Foot Brace',
    category: 'Mobility',
    brand: 'NEOFECT',
    description: 'Innovative AFO solution for foot drop relief and gait improvement.',
    price: '$89.00',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
    amazonUrl: 'https://amazon.com'
  },
  {
    id: '4',
    name: 'UPWELLY Knee Sleeve',
    category: 'Joint Support',
    brand: 'UPWELLY',
    description: '3D compression technology for knee stability and pain management.',
    price: '$29.00',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    amazonUrl: 'https://amazon.com'
  }
];

export const INITIAL_CONFIG: SiteConfig = {
  brandName: 'timbee',
  primaryColor: '#0056B3',
  logo: 'timbee',
  seoDescription: 'Premium Medical Supplies & Equipment. Specialized in NEOFECT and UPWELLY professional supports.',
  footerAbout: 'timbee is dedicated to providing high-quality medical grade braces and supports through our curated selection of NEOFECT and UPWELLY products.',
  footerCopyright: 'All rights reserved.',
  amazonUrl: 'https://amazon.com'
};
