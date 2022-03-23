import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumsService } from '../services/albums.service';
import {
  addAlbumFailure,
  addAlbumRequest,
  addAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess, getAlbumFailure,
  getAlbumRequest, getAlbumSuccess,
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
    mergeMap(({ artistId }) => this.albumsService.fetchAlbumsWithArtist(artistId).pipe(
      map((result) => fetchAlbumsSuccess(result)),
      catchError(() => of(fetchAlbumsFailure({error: 'Error fetch request'}))),
    )),
  ));

  getAlbum = createEffect(() => this.actions.pipe(
    ofType(getAlbumRequest),
    mergeMap(({ id }) => this.albumsService.getAlbum(id).pipe(
      map((album) => getAlbumSuccess({album})),
      this.helpersService.catchServerError(getAlbumFailure),
    )),
  ));

  addAlbum = createEffect(() => this.actions.pipe(
    ofType(addAlbumRequest),
    mergeMap(({albumData}) => this.albumsService.addAlbum(albumData).pipe(
      map(() => addAlbumSuccess()),
      tap(() => void this.router.navigate(['/albums', albumData.artist])),
      this.helpersService.catchServerError(addAlbumFailure),
    )),
  ));

  publishAlbum = createEffect(() => this.actions.pipe(
    ofType(publishAlbumRequest),
    mergeMap(({id, artistId}) => this.albumsService.publishAlbum(id).pipe(
      map(() => publishAlbumSuccess()),
      tap(() => this.store.dispatch(fetchAlbumsRequest({artistId}))),
      this.helpersService.catchServerError(publishAlbumFailure),
    )),
  ));

  removeAlbum = createEffect(() => this.actions.pipe(
    ofType(removeAlbumRequest),
    mergeMap(({id, artistId}) => this.albumsService.removeAlbum(id).pipe(
      map(() => removeAlbumSuccess()),
      tap(() => this.store.dispatch(fetchAlbumsRequest({artistId}))),
      this.helpersService.catchServerError(removeAlbumFailure),
    )),
  ));

}
