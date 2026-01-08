import {
  COLUMN,
  DRIVE_TYPE,
  OrderStatus,
  PRODUCT_STATUS,
  TRANSMISSION,
  UserStatus,
} from "./enum";
import { clsx, type ClassValue } from "clsx";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export interface ListType<T> {
  meta: Meta;
  items: T[];
}
export interface SearchType<T> {
  id: string;
  value: string;
  item?: T;
}
export type PPDT = { success: boolean; error?: string; data?: any };

export interface Meta {
  totalCount: number | string;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

export interface TABLE_TYPE {
  classname?: ClassValue;
  type: COLUMN;
  value: any;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  status?: number;
  onClick: (id: any) => void;
}
export const transmisstionValues = {
  [TRANSMISSION.AUTOMATIC]: "Automatic",
  [TRANSMISSION.MECHANIC]: "Mechanic",
};
export const driveTypeValues = {
  [DRIVE_TYPE.WD]: "4WD",
  [DRIVE_TYPE.FWD]: "FWD",
  [DRIVE_TYPE.RWD]: "RWD",
};
export const productStatusValues = {
  [PRODUCT_STATUS.Available]: "Available",
  [PRODUCT_STATUS.Unavailable]: "Unavailable",
};
export const orderStatusValues = {
  [OrderStatus.Cancelled]: "Cancelled",
  [OrderStatus.Approved]: "Approved",
  [OrderStatus.Pending]: "Pending",
};
export const orderStatusClass = {
  [OrderStatus.Cancelled]: "bg-red-500",
  [OrderStatus.Approved]: "bg-green-500",
  [OrderStatus.Pending]: "bg-yellow-500",
};
export const userStatusValues = {
  [UserStatus.Active]: "Active",
  [UserStatus.Deleted]: "Deleted",
};

export const grid = (col = 12, gap = 6) => {
  return `grid grid-cols-${col} gap-${gap}`;
};

export const colSpan = (span = 6) => {
  return `col-span-${span}`;
};
