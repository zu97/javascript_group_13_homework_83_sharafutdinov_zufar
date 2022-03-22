import { Component, Input } from '@angular/core';
import { Album } from '../../../models/album.model';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { publishAlbumRequest, removeAlbumRequest } from '../../../store/albums.actions';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent {
  @Input() album!: Album;
  apiUrl = environment.apiUrl;

  constructor(
    private store: Store<AppState>,
  ) {}

  onPublish(): void {
    this.store.dispatch(publishAlbumRequest({id: this.album._id}));
  }

  onRemove(): void {
    this.store.dispatch(removeAlbumRequest({id: this.album._id}));
  }
}
