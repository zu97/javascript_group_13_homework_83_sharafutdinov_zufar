import { UsersState } from './types';
import { createReducer, on } from '@ngrx/store';
import { RegisterUserFailure, RegisterUserRequest, RegisterUserSuccess } from './users.actions';

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  RegisterError: null,
};

export const usersReducer = createReducer(
  initialState,
  on(RegisterUserRequest, state => ({...state, registerLoading: true, RegisterError: null})),
  on(RegisterUserSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(RegisterUserFailure, (state, {error}) => ({...state, registerLoading: false, RegisterError: error}))
);
