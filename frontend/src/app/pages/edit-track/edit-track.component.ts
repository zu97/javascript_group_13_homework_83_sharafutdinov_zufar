import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Artist } from '../../models/artist.model';
import { fetchArtistsRequest } from '../../store/artists.actions';
import { AddTrackData } from '../../models/track.model';
import { addTrackRequest } from '../../store/tracks.actions';
import { Album } from '../../models/album.model';
import { fetchAlbumsRequest } from '../../store/albums.actions';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.css']
})
export class EditTrackComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  isLoading: Observable<boolean>;

  artists: Observable<Artist[]>;
  artistsLoading: Observable<boolean>;

  albums: Observable<Album[]>;
  albumsLoading: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.isLoading = store.select(state => state.tracks.addLoading);
    this.artists = store.select(state => state.artists.artists);
    this.artistsLoading = store.select(state => state.artists.fetchLoading);
    this.albums = store.select(state => state.albums.albums);
    this.albumsLoading = store.select(state => state.albums.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistsRequest());
  }

  onArtistSelected(id: string) {
    this.store.dispatch(fetchAlbumsRequest({id}));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const addTrackData: AddTrackData = this.form.value;
    this.store.dispatch(addTrackRequest({trackData: addTrackData}))
  }

}
