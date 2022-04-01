import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { LoginError, LoginSocialUserData } from '../../models/user.model';
import { facebookLoginUserRequest, googleLoginUserRequest, loginUserRequest } from '../../store/users.actions';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  isLoading: Observable<boolean>;
  error: Observable<null | LoginError>;

  isFacebookLoading: Observable<boolean>;
  facebookError: Observable<null | LoginError>;
  isGoogleLoading: Observable<boolean>;
  googleError: Observable<null | LoginError>;

  private authStateSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: SocialAuthService,
  ) {
    this.isLoading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
    this.isFacebookLoading = store.select((state) => state.users.facebookLoginLoading);
    this.facebookError = store.select((state) => state.users.facebookLoginError);
    this.isGoogleLoading = store.select((state) => state.users.googleLoginLoading);
    this.googleError = store.select((state) => state.users.googleLoginError);
  }

  ngOnInit(): void {
    this.authStateSub = this.authService.authState.subscribe((user) => {
      const userData: LoginSocialUserData = {
        authToken: user.authToken,
        id: user.id,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl
      };

      if (user.provider === 'FACEBOOK') {
        this.store.dispatch(facebookLoginUserRequest({userData}));
      } else if (user.provider === 'GOOGLE') {
        this.store.dispatch(googleLoginUserRequest({userData}));
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(loginUserRequest({ userData: this.form.value }));
  }

  fbLogin(): void {
    void this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleLogin(): void {
    void this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy(): void {
    this.authStateSub.unsubscribe();
  }

}
