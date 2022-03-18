import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { artistsReducer } from './store/artists.reducer';
import { ArtistsEffects } from './store/artists.effects';
import { albumsReducer } from './store/albums.reducer';
import { AlbumsEffects } from './store/albums.effects';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ArtistItemComponent } from './pages/artists/artist-item/artist-item.component';
import { ArtistDetailsComponent } from './pages/artists/artist-details/artist-details.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { RegisterComponent } from './pages/register/register.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoaderComponent,
    ArtistsComponent,
    ArtistItemComponent,
    ArtistDetailsComponent,
    LayoutComponent,
    FileInputComponent,
    ValidateIdenticalDirective,
    RegisterComponent,
    CenteredCardComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      artists: artistsReducer,
      albums: albumsReducer,
      users: usersReducer
    }, {}),
    EffectsModule.forRoot([ArtistsEffects, AlbumsEffects, UsersEffects]),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
