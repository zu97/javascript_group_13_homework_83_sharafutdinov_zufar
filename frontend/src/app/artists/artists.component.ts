import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { Artist } from '../shared/artist.model';
import { fetchArtistsRequest } from '../store/artists.actions';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  artists: Observable<Artist[]>;
  isLoading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.artists = store.select(state => state.artists.artists);
    this.isLoading = store.select(state => state.artists.fetchLoading);
    this.error = store.select(state => state.artists.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistsRequest());
  }

}
