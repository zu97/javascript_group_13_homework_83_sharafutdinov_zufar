import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchArtistsFailure, fetchArtistsRequest, fetchArtistsSuccess } from './artists.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ArtistsService } from '../services/artists.service';

@Injectable()
export class ArtistsEffects {

  fetchArtists = createEffect(() => this.actions.pipe(
    ofType(fetchArtistsRequest),
    mergeMap(() => this.artistsService.fetchArtists().pipe(
      map((artists) => fetchArtistsSuccess({ artists })),
      catchError(() => of(fetchArtistsFailure({ error: 'Error fetch request' })))
    ))
  ));

  constructor(
    private actions: Actions,
    private artistsService: ArtistsService,
  ) {}

}
