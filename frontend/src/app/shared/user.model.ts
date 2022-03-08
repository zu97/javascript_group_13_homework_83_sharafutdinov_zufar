export interface User {
  _id: string;
  email: string;
  avatar?: undefined | string;
  displayName: string;
  token: string;
}

export interface RegisterUserData {
  [key: string]: any;
  email: string;
  avatar?: undefined | string;
  displayName: string;
}

export interface fieldError {
  message: string;
}

export interface RegisterError {
  errors: {
    email?: undefined | fieldError;
    password?: undefined | fieldError;
    avatar?: undefined | fieldError;
    displayName?: undefined | fieldError;
  }
}
