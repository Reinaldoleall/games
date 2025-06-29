export interface User {
  id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  platform: Platform;
  category: Category;
  images: string[];
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type Platform = 'PS4' | 'PS5' | 'Xbox One' | 'Xbox Series X/S';
export type Category = 'Action' | 'Adventure' | 'RPG' | 'Sports' | 'Racing' | 'Shooter' | 'Strategy' | 'Fighting';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}