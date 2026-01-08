export interface User {
  id: string;
  name: string;
  status: number;
  mobile: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}
export interface AdminUser {
  id: string;
  name: string;
  status: number;
  mobile: string;
  email: string;
  username: string;
  password: string;
  role: number;
  createdAt: Date;
}
export interface LoginDto {
  username: string;
  password: string;
}
export interface RegisterDto {
  name: string;
  mobile: string;
  email: string;
  username: string;
  password: string;
}
