import { Component, Input } from '@angular/core';
import { Artist } from '../../../models/artist.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-artist-item',
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.css']
})
export class ArtistItemComponent {
  @Input() artist!: Artist;
  apiUrl = environment.apiUrl;
}
