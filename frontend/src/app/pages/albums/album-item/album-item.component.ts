import { Component, Input } from '@angular/core';
import { Album } from '../../../models/album.model';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { publishAlbumRequest, removeAlbumRequest } from '../../../store/albums.actions';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent {
  @Input() album!: Album;
  apiUrl = environment.apiUrl;

  publishLoading: Observable<boolean>;
  removeLoading: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.publishLoading = store.select(state => state.albums.publishLoading).pipe(
      map((isLoading) => isLoading === this.album._id),
    );
    this.removeLoading = store.select(state => state.albums.removeLoading).pipe(
      map((isLoading) => isLoading === this.album._id),
    );
  }

  onPublish(): void {
    this.store.dispatch(publishAlbumRequest({id: this.album._id, artistId: this.album.artist}));
  }

  onRemove(): void {
    this.store.dispatch(removeAlbumRequest({id: this.album._id, artistId: this.album.artist}));
  }
}
