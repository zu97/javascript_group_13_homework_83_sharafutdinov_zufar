import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Track } from '../../../models/track.model';
import { addHistoryTrackRequest, publishTrackRequest, removeTrackRequest } from '../../../store/tracks.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { YoutubeModalComponent } from '../../../ui/youtube-modal/youtube-modal.component';

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
    private dialog: MatDialog,
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

  onListen(): void {
    this.store.dispatch(addHistoryTrackRequest({id: this.track._id}));
  }

  onOpenYoutube(): void {
    this.onListen();
    this.dialog.open(YoutubeModalComponent, {
      data: {
        youtubeLink: this.track.youtube
      },
    });
  }

  onPublish(): void {
    this.store.dispatch(publishTrackRequest({id: this.track._id}));
  }

  onRemove(): void {
    this.store.dispatch(removeTrackRequest({id: this.track._id}));
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
