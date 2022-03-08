import { Artist } from '../shared/artist.model';
import { Album } from '../shared/album.model';
import { RegisterError, User } from '../shared/user.model';

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
  RegisterError: null | RegisterError
};

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UsersState
};
