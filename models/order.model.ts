import { OrderStatus } from "@/lib/enum";
import { Product } from "./product.model";

export interface OrderMeta {
  notes: string;
  userName: string;
  productName: string;
}
export interface Order {
  id: string;
  status: OrderStatus;
  productId: string;
  userId: string;
  mobile: string;
  email: string;
  startDate: Date;
  endDate: Date;
  description: string;
  meta: OrderMeta;
  product?: Product;
  createdAt: Date;
}
