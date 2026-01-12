export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
  aiHint: string;
  client: string;
  challenge: string;
  process: string;
  solution: string;
  impact: string;
  testimonial?: string;
  images: { url: string; alt: string; aiHint: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  idealFor: string;
  benefits: string[];
  deliverables: string[];
}

export interface ServiceItem {
  name: string;
  details: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  items: ServiceItem[];
}


export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
}

// Shop Interfaces based on user request

import { Timestamp } from "firebase/firestore";

export interface Category {
  id: string; // Document ID is usually implied, but adding for completeness in app usage
  createdAt: string;
  name: string;
}

export interface ShopCollection {
  id: string;
  timeStamp: string;
  name: string;
  productIds: string[];
}

export interface ShopProduct {
  id: string;
  collectionId?: string; // Reference to the collection it belongs to
  name: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  inStock: boolean;
  createdAt: string;
}
