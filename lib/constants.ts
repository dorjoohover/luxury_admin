import { Formtype } from "@/components/form";

export const DEFAULT_LIMIT = 20;
export const DEFAULT_PAGE = 0;
export const DEFAULT_SORT = true;
export const DEFAULT_META = {
  currentPage: 0,
  pageCount: 0,
  perPage: 0,
  totalCount: 0,
};

export interface FORM_GROUP {
  [key: string]: {
    data: Formtype[];
    classname?: string;
  };
}
