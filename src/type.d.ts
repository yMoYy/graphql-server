export interface RoutePath {
  user: string;
  auth:string;
  account: string;
  movie: string;
  review: string;
}

export interface User {
  user_id: string;
  u_name: string;
  u_last_name: string;
  u_email: string;
  u_password: string;
  u_phone: number;
  u_adress: string;
  u_state: boolean;
  role_id: number;
}