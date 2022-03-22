import { Component, Input } from '@angular/core';
import { Artist } from '../../../models/artist.model';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { publishArtistRequest, removeArtistRequest } from '../../../store/artists.actions';

@Component({
  selector: 'app-artist-item',
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.css']
})
export class ArtistItemComponent {
  @Input() artist!: Artist;
  apiUrl = environment.apiUrl;

  constructor(
    private store: Store<AppState>,
  ) {}

  onPublish(): void {
    this.store.dispatch(publishArtistRequest({id: this.artist._id}));
  }

  onRemove(): void {
    this.store.dispatch(removeArtistRequest({id: this.artist._id}));
  }

}
