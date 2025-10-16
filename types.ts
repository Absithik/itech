
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}
