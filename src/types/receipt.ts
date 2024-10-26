export interface Receipt {
  id: string;
  imageUrl: string;
  uploadDate: string;
  totalAmount: number;
  storeName: string;
  category: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string;
}