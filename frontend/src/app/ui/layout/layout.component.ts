import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users.actions';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user: Observable<null | User>;

  constructor(
    private store: Store<AppState>,
    private authService: SocialAuthService
  ) {
    this.user = store.select(state => state.users.user);
  }

  logout() {
    this.authService.signOut();
    this.store.dispatch(logoutUserRequest());
  }

}
