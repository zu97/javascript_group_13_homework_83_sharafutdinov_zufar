import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumsService } from '../shared/albums.service';
import { fetchAlbumsFailed, fetchAlbumsRequest, fetchAlbumsSuccess } from './albums.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AlbumsEffects {

  fetchAlbums = createEffect(() => this.actions.pipe(
    ofType(fetchAlbumsRequest),
    mergeMap(({ id }) => this.albumsService.fetchAlbumsWithArtist(id).pipe(
      map((result) => fetchAlbumsSuccess(result)),
      catchError(() => of(fetchAlbumsFailed({error: 'Error fetch request'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private albumsService: AlbumsService,
  ) {}

}
