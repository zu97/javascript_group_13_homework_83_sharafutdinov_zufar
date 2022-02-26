import { createAction, props } from '@ngrx/store';
import { Artist } from '../shared/artist.model';

export const fetchArtistsRequest = createAction('[Artists] Fetch Request');
export const fetchArtistsSuccess = createAction('[Artists] Fetch Success', props<{ artists: Artist[] }>());
export const fetchArtistsFailure = createAction('[Artists] Fetch Failure', props<{ error: string }>());
