import { Artist, ArtistError } from '../models/artist.model';
import { Album, AlbumError } from '../models/album.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { HistoryTrack, Track } from '../models/track.model';

export type ArtistsState = {
  artists: Artist[],
  fetchLoading: boolean,
  fetchError: null | string,
  addLoading: boolean,
  addError: null | ArtistError,
  publishLoading: boolean,
  removeLoading: boolean,
};

export type AlbumsState = {
  artist: null | Artist,
  albums: Album[],
  fetchLoading: boolean,
  fetchError: null | string,
  addLoading: boolean,
  addError: null | AlbumError,
  publishLoading: boolean,
  removeLoading: boolean,
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
  fetchLoading: boolean,
  addLoading: boolean,
  addError: null | AlbumError,
  publishLoading: boolean,
  removeLoading: boolean,

  historyTracks: HistoryTrack[],
  fetchHistoryLoading: boolean,
  addHistoryLoading: false | string,
};

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UsersState,
  tracks: TracksState
};
