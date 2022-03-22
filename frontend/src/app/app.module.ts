import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { AppStoreModule } from './app-store.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ArtistItemComponent } from './pages/artists/artist-item/artist-item.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { RegisterComponent } from './pages/register/register.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { LoginComponent } from './pages/login/login.component';
import { AlbumItemComponent } from './pages/albums/album-item/album-item.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TrackItemComponent } from './pages/tracks/track-item/track-item.component';
import { TracksHistoryComponent } from './pages/tracks-history/tracks-history.component';
import { TrackHistoryItemComponent } from './pages/tracks-history/track-history-item/track-history-item.component';
import { YoutubeModalComponent } from './ui/youtube-modal/youtube-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IsAuthDirective } from './directives/is-auth.directive';
import { HasRoleDirective } from './directives/has-role.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoaderComponent,
    ArtistsComponent,
    ArtistItemComponent,
    AlbumsComponent,
    LayoutComponent,
    FileInputComponent,
    ValidateIdenticalDirective,
    RegisterComponent,
    CenteredCardComponent,
    LoginComponent,
    AlbumItemComponent,
    TracksComponent,
    TrackItemComponent,
    TracksHistoryComponent,
    TrackHistoryItemComponent,
    YoutubeModalComponent,
    IsAuthDirective,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
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
    MatSnackBarModule,
    AppStoreModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
