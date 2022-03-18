import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { artistsReducer } from './store/artists.reducer';
import { albumsReducer } from './store/albums.reducer';
import { usersReducer } from './store/users.reducer';
import { tracksReducer } from './store/tracks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArtistsEffects } from './store/artists.effects';
import { AlbumsEffects } from './store/albums.effects';
import { UsersEffects } from './store/users.effects';
import { TracksEffects } from './store/tracks.effects';
import { localStorageSync } from 'ngrx-store-localstorage';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true,
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  artists: artistsReducer,
  albums: albumsReducer,
  users: usersReducer,
  tracks: tracksReducer,
};

const effects = [
  ArtistsEffects,
  AlbumsEffects,
  UsersEffects,
  TracksEffects
];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [
    StoreModule,
    EffectsModule,
  ]
})
export class AppStoreModule {}
