import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HistoryTrack } from '../../models/track.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchHistoryTrackRequest } from '../../store/tracks.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-tracks-history',
  templateUrl: './tracks-history.component.html',
  styleUrls: ['./tracks-history.component.css']
})
export class TracksHistoryComponent implements OnInit, OnDestroy {
  tracks: Observable<HistoryTrack[]>;
  isLoading: Observable<boolean>;

  private user: Observable<null | User>;
  private userSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.user = store.select(state => state.users.user);
    this.tracks = store.select(state => state.tracks.historyTracks);
    this.isLoading = store.select(state => state.tracks.fetchHistoryLoading);
  }

  ngOnInit(): void {
    this.userSubscription = this.user.subscribe((user) => {
      if (user) {
        return this.store.dispatch(fetchHistoryTrackRequest());
      }

      void this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
