import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddArtistData, Artist } from '../models/artist.model';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  constructor(
    private http: HttpClient,
  ) {}

  fetchArtists() {
    return this.http.get<Artist[]>(env.apiUrl + '/artists');
  }

  addArtist(artistData: AddArtistData) {
    const formData = new FormData();
    Object.keys(artistData).forEach((key) => {
      formData.append(key, artistData[key]);
    });

    return this.http.post(env.apiUrl + '/artists', formData);
  }

  publishArtist(id: string) {
    return this.http.post(env.apiUrl + '/artists/' + id + '/publish', {});
  }

  removeArtist(id: string) {
    return this.http.delete(env.apiUrl + '/artists/' + id);
  }

}
