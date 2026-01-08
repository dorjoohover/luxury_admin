import { defaultPagination, Pagination } from "@/base/query";
import { API } from "@/utils/api";
import { orderStatusValues, TABLE_TYPE } from "./const";
import { COLUMN, FORM_TYPE } from "./enum";
import { FORM_GROUP } from "./constants";
import { Formtype } from "@/components/form";

export const money = (
  value: number | string,
  currency = "",
  round = 1,
  slice?: number
) => {
  let v = Math.round(+value / round) * round;
  const result = `${currency}${v
    .toString()
    .replaceAll(",", "")
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  return slice ? result.slice(0, result.length - slice) : result;
};

export function paginationToQuery(
  uri: string,
  pagination: Pagination,
  route?: string
): string {
  const { limit, page, sort } = { ...defaultPagination, ...pagination };
  const filtersOnly = { ...pagination };
  delete filtersOnly.limit;
  delete filtersOnly.page;
  delete filtersOnly.sort;
  const url = API[uri as keyof typeof API];
  const params = new URLSearchParams();

  // Default pagination values
  if (pagination.limit) {
    params.append("limit", String(limit));
    params.append("page", String(page));
    params.append("sort", String(sort));
  }

  // Other filters
  Object.entries(filtersOnly).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value == "" ? "" : value));
    }
  });

  const queryString = params.toString();
  return `${url}${route ? `/${route}` : ""}${
    queryString ? `?${queryString}` : ""
  }`;
}

export const mnDateFormat = (date: Date, hour = true) => {
  if (!date) return "-";
  const formatted = new Intl.DateTimeFormat(
    "en-CA",
    hour
      ? {
          timeZone: "Asia/Ulaanbaatar",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }
      : {
          timeZone: "Asia/Ulaanbaatar",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
  )
    .format(new Date(date))
    .replace(",", "");
  return formatted;
};

export function createUniversalFormatter(config: {
  columns: { key: string; type: COLUMN; Icon?: any; classname?: string }[];
  dicts?: Record<string, Record<string, any>>;
  extra?: Record<string, (v: any, row: any) => any>;
}) {
  const { columns, dicts = {}, extra = {} } = config;

  const globalFormatters: Record<
    string,
    (value: any, row: any, deps: any) => any
  > = {
    text: (v) => v,
    date: (v) => mnDateFormat(v, false),
    number: (v) => Number(v).toLocaleString(),
    status: (v, _row, deps) => deps?.statusDict?.[v] ?? v,
  };

  const finalFormatters = { ...globalFormatters, ...extra };

  // ⬇ ⬇ ТОЛГОЙГООР БУСААР dictionary болгов
  const res = function formatRow(row: any, index: number) {
    const formatted: Record<string, TABLE_TYPE> = {};

    columns.forEach((col) => {
      const { key, type, Icon, classname } = col;
      const raw = row[key];
      let status;
      const formatter = finalFormatters[type];
      let value = formatter
        ? formatter(raw, row, { statusDict: dicts.status })
        : raw;
      if ((type == COLUMN.enum || type == COLUMN.badge) && config.dicts) {
        status = value;
        value = config.dicts?.[key][value];
      }
      value = value ?? "-";
      formatted[key] = {
        classname,
        type,
        value,
        status,
        Icon,
        onClick: (id: any) => {},
      };
    });

    return formatted;
  };

  return res;
}

export const mobileFormatter = (mobile: string) => {
  const value = mobile ? mobile.replace("+976", "") : "";
  return value.slice(0, 4) + "-" + value.slice(4);
};
export function getEnumValues<T extends Record<string, string | number>>(
  e: T
): T[keyof T][] {
  return Object.values(e).filter((v) => typeof v !== "string") as T[keyof T][];
}

export const handleFilter = (key: string, value: string, router: any) => {
  const query = new URLSearchParams();
  if (value && key) query.set(key, value);
  router.replace(`?${query.toString()}`); // server component дах page-ийг refresh
};

export const createInitialFormData = (
  form: { [key: string]: Formtype },
  value?: any
) => {
  const obj: any = {};

  Object.entries(form).forEach(([key, item]) => {
    if (item.form_type === FORM_TYPE.input) obj[key] = value?.[key] ?? "";
    else if (item.form_type === FORM_TYPE.number)
      obj[key] = value?.[key] ? +value[key] : 0;
    else if (item.form_type === FORM_TYPE.checkbox)
      obj[key] = value?.[key] ?? false;
    else if (item.form_type === FORM_TYPE.select)
      obj[key] = value?.[key] ?? item.props?.options?.[0].value;
    else obj[key] = value?.[key] ?? undefined;
  });

  return obj;
};

export const firstLetterUpper = (value: string) => {
  if (value.length == 0) return value;
  return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
};
