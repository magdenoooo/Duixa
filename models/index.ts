export interface ResponseApi<T> {
  success: boolean;
  data: T;
  message: string;
  isSeedData?: boolean;
}

export interface QueryListData<T> {
  success: boolean;
  data: T[];
  message: string;
  count: number;
  meta: Meta | null;
  isSeedData?: boolean;
}

export interface QuerySingleData<T> {
  success: boolean;
  data: T;
  message: string;
  isSeedData?: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    data: T[];
    meta: Meta;
    links: Links;
  };
  message: string;
  isSeedData?: boolean;
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
  name?: string;
  title?: string;
  description: string;
  price: number | string;
  discount_price?: number;
  discount_percentage?: number;
  is_featured?: number;
  is_new?: number;
  in_stock: number;
  rating?: number;
  rate?: number;
  total_rate?: number;
  image?: string;
  main_image?: string;
  images?: string[];
  additional_images?: any[];
  specifications?: Specification[];
  product_details?: ProductDetail[];
  pdf_files?: any[];
  files?: FileAttachment[];
  custom_links?: CustomLink[];
  purchase_links?: PurchaseLink[];
  amazon_link?: string;
  noon_link?: string;
  other_link?: null | string;
  video_url?: string;
  advantages?: string;
  notes?: string;
  tags?: string | string[];
  attributes?: string[];
  category?: Category;
  categories?: Category[];
  items?: any[];
  created_at?: Date;
  updated_at?: Date;
}

export interface Blog {
  id: string;
  title: string;
  description?: string;
  subTitle?: string;
  image?: string;
  content?: string;
  time_ago?: string;
  tags?: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface Category {
  id: number;
  name: string;
  slug?: null | string;
  products_count?: number;
}

export interface CustomLink {
  url: string;
  icon: string;
  name: string;
  color: string;
}

export interface PurchaseLink {
  name: string;
  url: string;
  color: string;
}

export interface Specification {
  key: string;
  value: string;
}

export interface ProductDetail {
  key: string;
  value: string;
}

export interface FileAttachment {
  name: string;
  size: string;
  src: string;
}

export interface ContactFormData {
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
}

export type ProductsResponse = PaginatedResponse<Product>;
export type BlogsResponse = PaginatedResponse<Blog>;