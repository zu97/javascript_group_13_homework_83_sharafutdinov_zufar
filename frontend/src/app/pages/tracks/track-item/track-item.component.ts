import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Track } from '../../../models/track.model';
import { addHistoryTrackRequest } from '../../../store/tracks.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.css']
})
export class TrackItemComponent implements OnInit, OnDestroy {
  @Input() track!: Track;
  isLoading = false;

  private loading: Observable<false | string>;
  private loadingSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
  ) {
    this.loading = store.select(state => state.tracks.addHistoryLoading);
  }

  ngOnInit(): void {
    this.loadingSubscription = this.loading.subscribe((isLoading) => {
      if (isLoading === this.track._id) {
        this.isLoading = true;
        return;
      }

      this.isLoading = false;
    });
  }

  onListen(id: string): void {
    this.store.dispatch(addHistoryTrackRequest({id}));
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
