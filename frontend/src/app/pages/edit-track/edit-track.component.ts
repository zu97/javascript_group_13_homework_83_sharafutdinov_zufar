import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Artist } from '../../models/artist.model';
import { fetchArtistsRequest } from '../../store/artists.actions';
import { AddTrackData } from '../../models/track.model';
import { addTrackRequest } from '../../store/tracks.actions';
import { Album, AlbumWithArtist } from '../../models/album.model';
import { fetchAlbumsRequest, getAlbumRequest } from '../../store/albums.actions';
import { ActivatedRoute } from '@angular/router';

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

  albumId = '';
  album: Observable<null | AlbumWithArtist>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.isLoading = store.select(state => state.tracks.addLoading);
    this.artists = store.select(state => state.artists.artists);
    this.artistsLoading = store.select(state => state.artists.fetchLoading);
    this.albums = store.select(state => state.albums.albums);
    this.albumsLoading = store.select(state => state.albums.fetchLoading);

    this.album = store.select(state => state.albums.album)
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const albumId = <undefined | string>params['album'];

      if (albumId) {
        this.albumId = albumId;
        this.store.dispatch(getAlbumRequest({id: albumId}));
      } else {
        this.setArtistValue('');
        this.setAlbumValue('');
      }
    });

    this.album.subscribe((album) => {
      if (this.albumId && album) {
        this.setArtistValue(album.artist._id);
        this.setAlbumValue(album._id);
      }
    });

    this.store.dispatch(fetchArtistsRequest());
  }

  setArtistValue(value: string) {
    setTimeout(() => {
      this.form.form.get('artist')?.setValue(value);
    });
  }

  setAlbumValue(value: string) {
    setTimeout(() => {
      this.form.form.get('album')?.setValue(value);
    });
  }

  onArtistSelected(artistId: string) {
    this.store.dispatch(fetchAlbumsRequest({artistId}));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const addTrackData: AddTrackData = this.form.value;
    this.store.dispatch(addTrackRequest({trackData: addTrackData}))
  }

}
