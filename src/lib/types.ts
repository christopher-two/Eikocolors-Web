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
