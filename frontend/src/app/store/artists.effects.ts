import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addArtistFailure,
  addArtistRequest,
  addArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess,
  publishArtistFailure,
  publishArtistRequest,
  publishArtistSuccess,
  removeArtistFailure,
  removeArtistRequest,
  removeArtistSuccess
} from './artists.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ArtistsService } from '../services/artists.service';
import { HelpersServices } from '../services/helpers.services';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { Router } from '@angular/router';

@Injectable()
export class ArtistsEffects {

  constructor(
    private actions: Actions,
    private artistsService: ArtistsService,
    private helpersService: HelpersServices,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  fetchArtists = createEffect(() => this.actions.pipe(
    ofType(fetchArtistsRequest),
    mergeMap(() => this.artistsService.fetchArtists().pipe(
      map((artists) => fetchArtistsSuccess({ artists })),
      catchError(() => of(fetchArtistsFailure({ error: 'Error fetch request' })))
    ))
  ));

  addArtist = createEffect(() => this.actions.pipe(
    ofType(addArtistRequest),
    mergeMap(({artistData}) => this.artistsService.addArtist(artistData).pipe(
      map(() => addArtistSuccess()),
      tap(() => void this.router.navigate(['/'])),
      this.helpersService.catchServerError(addArtistFailure),
    ))
  ));

  publishArtist = createEffect(() => this.actions.pipe(
    ofType(publishArtistRequest),
    mergeMap(({id}) => this.artistsService.publishArtist(id).pipe(
      map(() => publishArtistSuccess()),
      tap(() => this.store.dispatch(fetchArtistsRequest())),
      this.helpersService.catchServerError(publishArtistFailure),
    ))
  ));

  removeArtist = createEffect(() => this.actions.pipe(
    ofType(removeArtistRequest),
    mergeMap(({id}) => this.artistsService.removeArtist(id).pipe(
      map(() => removeArtistSuccess()),
      tap(() => this.store.dispatch(fetchArtistsRequest())),
      this.helpersService.catchServerError(removeArtistFailure),
    ))
  ));

}
