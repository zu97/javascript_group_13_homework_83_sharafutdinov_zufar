import { UsersState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess, logoutUser,
  RegisterUserFailure,
  RegisterUserRequest,
  RegisterUserSuccess
} from './users.actions';

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersReducer = createReducer(
  initialState,
  on(RegisterUserRequest, state => ({...state, registerLoading: true, registerError: null})),
  on(RegisterUserSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(RegisterUserFailure, (state, {error}) => ({...state, registerLoading: false, registerError: error})),
  on(loginUserRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(loginUserSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginUserFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),
  on(logoutUser, state => ({...state, user: null})),
);
