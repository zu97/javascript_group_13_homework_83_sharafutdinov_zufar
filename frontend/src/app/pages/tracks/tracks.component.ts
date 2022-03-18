import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchTracksRequest } from '../../store/tracks.actions';
import { Observable } from 'rxjs';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  tracks: Observable<Track[]>;
  isLoading: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.tracks = store.select(state => state.tracks.tracks);
    this.isLoading = store.select(state => state.tracks.fetchLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const albumId = <string>params['album'];
      this.store.dispatch(fetchTracksRequest({albumId}));
    });
  }

}
