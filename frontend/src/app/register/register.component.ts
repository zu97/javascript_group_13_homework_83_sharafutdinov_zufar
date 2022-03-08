import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RegisterError } from '../shared/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { RegisterUserRequest } from '../store/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  isLoading: Observable<boolean>;
  error: Observable<null | RegisterError>;

  private errorSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
  ) {
    this.isLoading = store.select(state => state.users.registerLoading);
    this.error = store.select(state => state.users.RegisterError);
  }

  ngAfterViewInit(): void {
    this.errorSubscription = this.error.subscribe((error) => {
      const email = error?.errors.email?.message;
      if (email) {
        this.form.form.get('email')?.setErrors({emailServerError: email});
      }

      const avatar = error?.errors.avatar?.message;
      if (avatar) {
        this.form.form.get('email')?.setErrors({avatarServerError: avatar});
      }

      if (!email && !avatar) {
        this.form.form.get('email')?.setErrors({});
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const userData = this.form.value;
    delete userData.rePassword;

    this.store.dispatch(RegisterUserRequest({ userData }));
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

}
