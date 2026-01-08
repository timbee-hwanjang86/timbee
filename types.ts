
export type Brand = 'NEOFECT' | 'UPWELLY';

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: Brand;
  description: string;
  price: string;
  imageUrl: string;
  amazonUrl: string;
}

export interface SiteConfig {
  brandName: string;
  primaryColor: string;
  logo: string;
  seoDescription: string;
  footerAbout: string;
  footerCopyright: string;
  amazonUrl: string;
  address: string;
}

export type View = 'home' | 'products' | 'admin' | 'about';
