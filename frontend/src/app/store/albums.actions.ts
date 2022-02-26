import { createAction, props } from '@ngrx/store';
import { Album } from '../shared/album.model';
import { Artist } from '../shared/artist.model';

export const fetchAlbumsRequest = createAction('[Albums] Fetch Request', props<{ id: string }>());
export const fetchAlbumsSuccess = createAction('[Albums] Fetch Success', props<{ artist: Artist, albums: Album[]}>());
export const fetchAlbumsFailed = createAction('[Albums] Fetch Failed', props<{ error: null | string}>());
