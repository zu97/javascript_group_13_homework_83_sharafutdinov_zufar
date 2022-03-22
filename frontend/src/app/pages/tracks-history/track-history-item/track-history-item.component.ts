import { Component, Input } from '@angular/core';
import { HistoryTrack } from '../../../models/track.model';

@Component({
  selector: 'app-track-history-item',
  templateUrl: './track-history-item.component.html',
  styleUrls: ['./track-history-item.component.css']
})
export class TrackHistoryItemComponent {
  @Input() historyTrack!: HistoryTrack;
}
