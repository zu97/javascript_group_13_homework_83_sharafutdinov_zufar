import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../shared/users.service';
import { RegisterUserFailure, RegisterUserRequest, RegisterUserSuccess } from './users.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UsersEffects {

  constructor(
    private actions: Actions,
    private router: Router,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
  ) {}

  registerUser = createEffect(() => this.actions.pipe(
    ofType(RegisterUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map((user) => RegisterUserSuccess({user})),
      tap(() => {
        this.snackBar.open('User is registered', 'OK', {duration: 3000});
        void this.router.navigate(['/']);
      }),
      catchError((error) => {
        let serverError = null;

        if (error instanceof HttpErrorResponse && error.status === 400) {
          serverError = error.error;
        } else {
          this.snackBar.open('Server error', 'OK', {duration: 3000});
        }

        return of(RegisterUserFailure({error: serverError}));
      }),
    )),
  ));

}
