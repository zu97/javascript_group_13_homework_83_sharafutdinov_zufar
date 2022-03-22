import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TracksHistoryComponent } from './pages/tracks-history/tracks-history.component';
import { EditArtistComponent } from './pages/edit-artist/edit-artist.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EditAlbumComponent } from './pages/edit-album/edit-album.component';
import { EditTrackComponent } from './pages/edit-track/edit-track.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: 'artists/new', component: EditArtistComponent, canActivate: [AuthGuardService]},
  {path: 'albums/:artist', component: AlbumsComponent},
  {path: 'albums/:artist/new', component: EditAlbumComponent, canActivate: [AuthGuardService]},
  {path: 'tracks/:album', component: TracksComponent},
  {path: 'tracks/:album/new', component: EditTrackComponent, canActivate: [AuthGuardService]},
  {path: 'history', component: TracksHistoryComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
