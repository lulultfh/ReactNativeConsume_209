export interface User {
  id: String;
  username: String;
  email?: String;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: string;
}

export interface RegisterResponse {
  message: string;
  data: User;
}
