import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env, environment } from '../../environments/environment';
import { AddAlbumData, Album } from '../models/album.model';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  fetchAlbumsWithArtist(artistId: string) {
    return this.http.get<{artist: Artist, albums: Album[]}>(this.apiUrl + '/albums/withArtist/' + artistId);
  }

  addAlbum(albumData: AddAlbumData) {
    const formData = new FormData();
    Object.keys(albumData).forEach((key) => {
      formData.append(key, albumData[key]);
    });

    return this.http.post(env.apiUrl + '/albums', formData);
  }

  publishAlbum(id: string) {
    return this.http.post(env.apiUrl + '/albums/' + id + '/publish', {});
  }

  removeAlbum(id: string) {
    return this.http.delete(env.apiUrl + '/albums/' + id);
  }

}
