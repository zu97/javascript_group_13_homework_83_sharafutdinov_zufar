import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../models/artist.model';
import { Album } from '../../models/album.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchAlbumsRequest } from '../../store/albums.actions';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-artist-details',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  artist: Observable<null | Artist>;
  albums: Observable<Album[]>;
  isLoading: Observable<boolean>;
  error: Observable<null | string>;

  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.artist = store.select(state => state.albums.artist);
    this.albums = store.select(state => state.albums.albums);
    this.isLoading = store.select(state => state.albums.fetchLoading);
    this.error = store.select(state => state.albums.fetchError)
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = <string>params['artist'];
      this.store.dispatch(fetchAlbumsRequest({ id }));
    });
  }

}
