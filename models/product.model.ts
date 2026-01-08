import { PRODUCT_STATUS, TRANSMISSION } from "@/lib/enum";

export type Product = {
  id?: string;
  name?: string;
  status: PRODUCT_STATUS;
  engineId?: string;
  brandId?: string;
  transmission?: TRANSMISSION;
  driver_min_age?: number;
  drive_type?: number;
  description: string;
  seats?: number;
  doors?: number;
  luggage_capacity?: string;
  features?: string[];
  price?: number;
  img?: string;
  createdAt: Date;

  brandName?: string;
  engineName?: string;
};
