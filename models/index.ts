export interface ResponseApi<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    data: T[];
    meta: Meta;
    links: Links;
  };
  message: string;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  discount_percentage: number;
  is_featured: number;
  is_new: number;
  in_stock: number;
  rating: number;
  image: string;
  additional_images: any[];
  specifications: Specification[];
  pdf_files: any[];
  custom_links: CustomLink[];
  amazon_link: string;
  noon_link: string;
  other_link: null | string;
  video_url: string;
  advantages: string;
  tags: string;
  category: Category;
  items: any[];
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: null | string;
}

export interface CustomLink {
  url: string;
  icon: string;
  name: string;
  color: string;
}

export interface Specification {
  key: string;
  value: string;
}

export type ProductsResponse = PaginatedResponse<Product>;
