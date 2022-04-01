import { UsersState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  facebookLoginUserFailure,
  facebookLoginUserRequest, facebookLoginUserSuccess, googleLoginUserFailure,
  googleLoginUserRequest, googleLoginUserSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  facebookLoginLoading: false,
  facebookLoginError: null,
  googleLoginLoading: false,
  googleLoginError: null
};

export const usersReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({...state, registerLoading: true, registerError: null})),
  on(registerUserSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(registerUserFailure, (state, {error}) => ({...state, registerLoading: false, registerError: error})),
  on(loginUserRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(loginUserSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginUserFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),

  on(facebookLoginUserRequest, state => ({...state, facebookLoginLoading: true, facebookLoginError: null})),
  on(facebookLoginUserSuccess, (state, {user}) => ({...state, facebookLoginLoading: false, user})),
  on(facebookLoginUserFailure, (state, {error}) => ({...state, facebookLoginLoading: false, facebookLoginError: error})),

  on(googleLoginUserRequest, state => ({...state, googleLoginLoading: true, googleLoginError: null})),
  on(googleLoginUserSuccess, (state, {user}) => ({...state, googleLoginLoading: false, user})),
  on(googleLoginUserFailure, (state, {error}) => ({...state, googleLoginLoading: false, googleLoginError: error})),

  on(logoutUser, state => ({...state, user: null})),
);
