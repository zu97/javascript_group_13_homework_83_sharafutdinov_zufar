import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../../models/artist.model';
import { Album } from '../../../models/album.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { fetchAlbumsRequest } from '../../../store/albums.actions';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {
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
      const id = <string>params['id'];
      this.store.dispatch(fetchAlbumsRequest({ id }));
    });
  }

}
