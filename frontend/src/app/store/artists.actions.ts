import { createAction, props } from '@ngrx/store';
import { AddArtistData, Artist, ArtistError } from '../models/artist.model';

export const fetchArtistsRequest = createAction('[Artists] Fetch Request');
export const fetchArtistsSuccess = createAction('[Artists] Fetch Success', props<{ artists: Artist[] }>());
export const fetchArtistsFailure = createAction('[Artists] Fetch Failure', props<{ error: string }>());

export const addArtistRequest = createAction('[Artists] Add Request', props<{ artistData: AddArtistData  }>());
export const addArtistSuccess = createAction('[Artists] Add Success');
export const addArtistFailure = createAction('[Artists] Add Failure', props<{ error: null | ArtistError }>());

export const publishArtistRequest = createAction('[Artists] Publish Request', props<{ id: string }>());
export const publishArtistSuccess = createAction('[Artists] Publish Success');
export const publishArtistFailure = createAction('[Artists] Publish Failure');

export const removeArtistRequest = createAction('[Artists] Remove Request', props<{ id: string }>());
export const removeArtistSuccess = createAction('[Artists] Remove Success');
export const removeArtistFailure = createAction('[Artists] Remove Failure');
