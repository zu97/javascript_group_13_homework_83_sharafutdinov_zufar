import { Component, Input } from '@angular/core';
import { Album } from '../../../models/album.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent {
  @Input() album!: Album;
  apiUrl = environment.apiUrl;
}
