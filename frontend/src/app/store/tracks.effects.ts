import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addHistoryTrackFailure,
  addHistoryTrackRequest,
  addHistoryTrackSuccess, fetchHistoryTrackFailure, fetchHistoryTrackRequest, fetchHistoryTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess
} from './tracks.actions';
import { catchError, map, mergeMap, NEVER, of, withLatestFrom } from 'rxjs';
import { TracksService } from '../services/tracks.service';
import { HelpersServices } from '../services/helpers.services';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()
export class TracksEffects {

  constructor(
    private actions: Actions,
    private tracksService: TracksService,
    private helpersService: HelpersServices,
    private store: Store<AppState>,
  ) {
  }

  fetchTracks = createEffect(() => this.actions.pipe(
    ofType(fetchTracksRequest),
    mergeMap(({albumId}) => this.tracksService.fetchTracks(albumId).pipe(
      map((tracks) => fetchTracksSuccess({tracks})),
      catchError(() => {
        this.helpersService.openSnackBar('Could not fetch tracks');
        return of(fetchTracksFailure);
      }),
    )),
  ));

  fetchHistoryTracks = createEffect(() => this.actions.pipe(
    ofType(fetchHistoryTrackRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([_, user]) => {
      if (user) {
        return this.tracksService.fetchHistoryTracks(user.token).pipe(
          map((tracks) => fetchHistoryTrackSuccess({tracks})),
          catchError(() => {
            this.helpersService.openSnackBar('Could not fetch history tracks');
            return of(fetchHistoryTrackFailure);
          }),
        );
      }

      return NEVER;
    })
  ));

  addHistoryTrack = createEffect(() => this.actions.pipe(
    ofType(addHistoryTrackRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([data, user]) => {
      if (user) {
        return this.tracksService.addHistoryTrack(user.token, data.id).pipe(
          map(() => addHistoryTrackSuccess()),
          catchError(() => {
            this.helpersService.openSnackBar('Failed to add track to history');
            return of(addHistoryTrackFailure);
          }),
        );
      }

      return NEVER;
    }),
  ));

}
