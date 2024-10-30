export interface ProductModel {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stockQuantity: number;
  sku: string;
  brand: string;
  images: ImageModel[];
}

export interface ImageModel {
  url: string;
}
