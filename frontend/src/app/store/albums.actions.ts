import { createAction, props } from '@ngrx/store';
import { AddAlbumData, Album, AlbumError, AlbumWithArtist } from '../models/album.model';
import { Artist } from '../models/artist.model';

export const fetchAlbumsRequest = createAction('[Albums] Fetch Request', props<{ artistId: string }>());
export const fetchAlbumsSuccess = createAction('[Albums] Fetch Success', props<{ artist: Artist, albums: Album[]}>());
export const fetchAlbumsFailure = createAction('[Albums] Fetch Failure', props<{ error: null | string}>());

export const getAlbumRequest = createAction('[Albums] Get Request', props<{ id: string }>());
export const getAlbumSuccess = createAction('[Albums] Get Success', props<{ album: AlbumWithArtist }>());
export const getAlbumFailure = createAction('[Albums] Get Failure');

export const addAlbumRequest = createAction('[Albums] Add Request', props<{ albumData: AddAlbumData }>());
export const addAlbumSuccess = createAction('[Albums] Add Success');
export const addAlbumFailure = createAction('[Albums] Add Failure', props<{ error: null | AlbumError }>());

export const publishAlbumRequest = createAction('[Albums] Publish Request', props<{ id: string, artistId: string }>());
export const publishAlbumSuccess = createAction('[Albums] Publish Success');
export const publishAlbumFailure = createAction('[Albums] Publish Failure');

export const removeAlbumRequest = createAction('[Albums] Remove Request', props<{ id: string, artistId: string }>());
export const removeAlbumSuccess = createAction('[Albums] Remove Success');
export const removeAlbumFailure = createAction('[Albums] Remove Failure');
