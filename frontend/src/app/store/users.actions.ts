import { createAction, props } from '@ngrx/store';
import { RegisterError, RegisterUserData, User } from '../models/user.model';

export const RegisterUserRequest = createAction('[Users] Register Request', props<{userData: RegisterUserData}>());
export const RegisterUserSuccess = createAction('[Users] Register Success', props<{user: User}>());
export const RegisterUserFailure = createAction('[Users] Register Failure', props<{error: null | RegisterError}>());
