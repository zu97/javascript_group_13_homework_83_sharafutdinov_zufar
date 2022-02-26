import { createReducer, on } from '@ngrx/store';
import { ArtistsState } from './types';
import { fetchArtistsFailure, fetchArtistsRequest, fetchArtistsSuccess } from './artists.actions';

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  fetchError: null
};

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchLoading: true})),
  on(fetchArtistsSuccess, (state, { artists }) => ({...state, artists, fetchLoading: false})),
  on(fetchArtistsFailure, (state, { error }) => ({...state, fetchLoading: false, fetchError: error}))
);
