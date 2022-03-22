import { createReducer, on } from '@ngrx/store';
import { ArtistsState } from './types';
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

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  fetchError: null,
  addLoading: false,
  addError: null,
  publishLoading: false,
  removeLoading: false,
};

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchLoading: true})),
  on(fetchArtistsSuccess, (state, { artists }) => ({...state, artists, fetchLoading: false})),
  on(fetchArtistsFailure, (state, { error }) => ({...state, fetchLoading: false, fetchError: error})),

  on(addArtistRequest, state => ({...state, addLoading: true, addError: null})),
  on(addArtistSuccess, state => ({...state, addLoading: false})),
  on(addArtistFailure, (state, {error}) => ({...state, addLoading: false, addError: error})),

  on(publishArtistRequest, state => ({...state, publishLoading: true})),
  on(publishArtistSuccess, state => ({...state, publishLoading: false})),
  on(publishArtistFailure, state => ({...state, publishLoading: false})),

  on(removeArtistRequest, state => ({...state, removeLoading: true})),
  on(removeArtistSuccess, state => ({...state, removeLoading: false})),
  on(removeArtistFailure, state => ({...state, removeLoading: false})),
);
