import { createReducer, on } from '@ngrx/store';
import { fetchAlbumsFailed, fetchAlbumsRequest, fetchAlbumsSuccess } from './albums.actions';
import { AlbumsState } from './types';

const initialState: AlbumsState = {
  artist: null,
  albums: [],
  fetchLoading: false,
  fetchError: null
};

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchLoading: true})),
  on(fetchAlbumsSuccess, (state, { artist, albums }) => ({...state, artist, albums , fetchLoading: false})),
  on(fetchAlbumsFailed, (state, { error }) => ({...state, fetchLoading: false, fetchError: error}))
);
