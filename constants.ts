
import { Product, SiteConfig } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "1",
    "name": "NEOFECT Finger Splint",
    "category": "Rehabilitation",
    "brand": "NEOFECT",
    "description": "High-tech rehabilitation device for stroke survivors and hand injury patients.",
    "price": "$49.99",
    "imageUrl": "https://m.media-amazon.com/images/I/61+I6x9NvrL._SL1500_.jpg",
    "amazonUrl": "https://www.amazon.com/dp/B08J49HFKK?th=1"
  },
  {
    "id": "2",
    "name": "UPWELLY FootLift Pro LEFT",
    "category": "Back Support",
    "brand": "UPWELLY",
    "description": "Orthopedic grade back support designed for all-day comfort and postural correction.",
    "price": "$39.9",
    "imageUrl": "https://m.media-amazon.com/images/I/81UQDPRHzVL._SL1500_.jpg",
    "amazonUrl": "https://www.amazon.com/dp/B0FQN35CC1?th=1"
  },
  {
    "id": "3",
    "name": "NEOFECT Drop Foot Brace",
    "category": "Mobility",
    "brand": "NEOFECT",
    "description": "Innovative AFO solution for foot drop relief and gait improvement.",
    "price": "$54.99",
    "imageUrl": "https://m.media-amazon.com/images/I/71dYk2E2z-L._AC_UY218_.jpg",
    "amazonUrl": "https://www.amazon.com/dp/B0D716YT7W?th=1"
  },
  {
    "id": "4",
    "name": "UPWELLY FootLift Pro RIGHT",
    "category": "Joint Support",
    "brand": "UPWELLY",
    "description": "3D compression technology for knee stability and pain management.",
    "price": "$39.9",
    "imageUrl": "https://m.media-amazon.com/images/I/81CdSA8JbJL._SL1500_.jpg",
    "amazonUrl": "https://www.amazon.com/dp/B0FQN11PSF?th=1"
  }
];

export const INITIAL_CONFIG: SiteConfig = {
  "brandName": "timbee",
  "primaryColor": "#0056B3",
  "logo": "timbee",
  "seoDescription": "Premium Medical Supplies & Equipment. Specialized in NEOFECT and UPWELLY professional supports.",
  "footerAbout": "timbee is dedicated to providing high-quality medical grade braces and supports through our curated selection of NEOFECT and UPWELLY products.",
  "footerCopyright": "All rights reserved.",
  "amazonUrl": "https://www.amazon.com/s?me=AVQYY6T108GIT&marketplaceID=ATVPDKIKX0DER",
  "address": ""
};

export const ADMIN_SECRET_CODE = 'timbee2025';
