export interface User {
  _id: string;
  email: string;
  avatar?: undefined | string;
  displayName: string;
  token: string;
  role: string;
}

export interface RegisterUserData {
  [key: string]: any;
  email: string;
  password: string;
  avatar?: undefined | string;
  displayName: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface FieldError {
  message: string;
}

export interface RegisterError {
  errors: {
    email?: undefined | FieldError;
    password?: undefined | FieldError;
    avatar?: undefined | FieldError;
    displayName?: undefined | FieldError;
  }
}

export interface LoginError {
  error: string;
}
