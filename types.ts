
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
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export type View = 'home' | 'products' | 'admin' | 'about';
