import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { HistoryTrack, Track } from '../models/track.model';

export type ArtistsState = {
  artists: Artist[],
  fetchLoading: boolean,
  fetchError: null | string,
};

export type AlbumsState = {
  artist: null | Artist,
  albums: Album[],
  fetchLoading: boolean,
  fetchError: null | string,
};

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
};

export type TracksState = {
  tracks: Track[],
  historyTracks: HistoryTrack[],
  fetchLoading: boolean,
  fetchHistoryLoading: boolean,
  addHistoryLoading: false | string,
};

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UsersState,
  tracks: TracksState
};
