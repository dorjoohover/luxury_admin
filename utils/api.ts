export enum METHOD {
  get = "GET",
  post = "POST",
  put = "PUT",
  patch = "PATCH",
  delete = "DELETE",
}
const BASE = process.env.API;

export enum Api {
  login = "login",
  order = "order",
  register = "register",
  customer_register = "customer_register",
  user = "admin-user",
  // dev
  customer = "customer",
  file = "file",
  booking = "booking",
  product = "product",
  engine = "engine",
  feature = "feature",
  brand = "brand",
  upload = "upload",
}

export const API = {
  [Api.login]: BASE + "dash/admin/login",
  [Api.order]: BASE + "order",
  [Api.engine]: BASE + "engine",
  [Api.brand]: BASE + "brand",
  [Api.customer]: BASE + "user",
  [Api.customer_register]: BASE + "customer/register",
  [Api.register]: BASE + "customer/register",
  [Api.user]: BASE + "admin-user",
  [Api.product]: BASE + "product",
  [Api.feature]: BASE + "feature",
  [Api.file]: BASE + "file",
  [Api.upload]: BASE + "upload",
};

export const baseUrl = process.env.URL || "http://72.62.196.155:3000/";
