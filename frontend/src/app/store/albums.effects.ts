import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumsService } from '../services/albums.service';
import {
  addAlbumFailure,
  addAlbumRequest,
  addAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  publishAlbumFailure,
  publishAlbumRequest,
  publishAlbumSuccess,
  removeAlbumFailure,
  removeAlbumRequest,
  removeAlbumSuccess
} from './albums.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersServices } from '../services/helpers.services';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { Router } from '@angular/router';

@Injectable()
export class AlbumsEffects {

  constructor(
    private actions: Actions,
    private albumsService: AlbumsService,
    private helpersService: HelpersServices,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  fetchAlbums = createEffect(() => this.actions.pipe(
    ofType(fetchAlbumsRequest),
    mergeMap(({ id }) => this.albumsService.fetchAlbumsWithArtist(id).pipe(
      map((result) => fetchAlbumsSuccess(result)),
      catchError(() => of(fetchAlbumsFailure({error: 'Error fetch request'})))
    ))
  ));

  addAlbum = createEffect(() => this.actions.pipe(
    ofType(addAlbumRequest),
    mergeMap(({albumData}) => this.albumsService.addAlbum(albumData).pipe(
      map(() => addAlbumSuccess()),
      tap(() => void this.router.navigate(['/'])),
      this.helpersService.catchServerError(addAlbumFailure),
    ))
  ));

  publishAlbum = createEffect(() => this.actions.pipe(
    ofType(publishAlbumRequest),
    mergeMap(({id}) => this.albumsService.publishAlbum(id).pipe(
      map(() => publishAlbumSuccess()),
      tap(() => void this.router.navigate(['/'])),
      this.helpersService.catchServerError(publishAlbumFailure),
    ))
  ));

  removeAlbum = createEffect(() => this.actions.pipe(
    ofType(removeAlbumRequest),
    mergeMap(({id}) => this.albumsService.removeAlbum(id).pipe(
      map(() => removeAlbumSuccess()),
      tap(() => void this.router.navigate(['/'])),
      this.helpersService.catchServerError(removeAlbumFailure),
    ))
  ));

}
