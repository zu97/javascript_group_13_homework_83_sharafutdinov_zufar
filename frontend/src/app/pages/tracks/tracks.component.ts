import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchTracksRequest } from '../../store/tracks.actions';
import { Observable } from 'rxjs';
import { Track } from '../../models/track.model';
import { getAlbumRequest } from '../../store/albums.actions';
import { AlbumWithArtist } from '../../models/album.model';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  album: Observable<null | AlbumWithArtist>;
  albumLoading: Observable<boolean>;

  tracks: Observable<Track[]>;
  tracksLoading: Observable<boolean>;

  apiUrl = env.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.album = store.select(state => state.albums.album);
    this.albumLoading = store.select(state => state.albums.getLoading);
    this.tracks = store.select(state => state.tracks.tracks);
    this.tracksLoading = store.select(state => state.tracks.fetchLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const albumId = <string>params['album'];
      this.store.dispatch(getAlbumRequest({id: albumId}));
      this.store.dispatch(fetchTracksRequest({albumId}));
    });
  }

}
