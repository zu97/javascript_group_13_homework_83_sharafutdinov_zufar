import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailsComponent } from './artists/artist-details/artist-details.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: 'artists/:id', component: ArtistDetailsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
