export enum TRANSMISSION {
  AUTOMATIC = 1,
  MECHANIC = 2,
}

export enum PRODUCT_STATUS {
  Available = 10,
  Unavailable = 0,
}

export enum DRIVE_TYPE {
  // urd
  FWD = 2,
  // hoid
  RWD = 3,
  // 4
  WD = 4,
}
export enum UserStatus {
  Active = 10,
  Deleted = 20,
}

export enum OrderStatus {
  Cancelled = 0,
  Pending = 10,
  Approved = 20,
}

export enum FORM_TYPE {
  input = "input",
  number = "number",
  money = "money",
  checkbox = "checkbox",
  textarea = "textarea",
  select = "select",
  files = "files",
}

export enum COLUMN {
  text = "text",
  btn = "btn",
  img = "img",
  date = "date",
  badge = "badge",
  enum = "enum",
  boolean = "boolean",
  hidden = "hidden",
  money = "money",
  approve = "approve",
  cancel = "cancel",
  edit = "edit",
  detail = "detail",
}

export enum STATUS {
  Cancelled = 0,
  Pending = 10,
  Approved = 20,
}
