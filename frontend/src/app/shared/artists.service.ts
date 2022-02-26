import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiArtistData, Artist } from './artist.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  fetchArtists() {
    return this.http.get<ApiArtistData[]>(this.apiUrl + '/artists')
      .pipe(map((results) => {
        return results.map((result) => {
          return new Artist(result._id, result.name, result.image, result.information);
        });
      }));
  }

}
