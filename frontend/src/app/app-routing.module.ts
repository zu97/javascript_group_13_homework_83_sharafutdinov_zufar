import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TracksHistoryComponent } from './pages/tracks-history/tracks-history.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: 'artists/:id', component: AlbumsComponent},
  {path: 'artists/:artist/:album', component: TracksComponent},
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
