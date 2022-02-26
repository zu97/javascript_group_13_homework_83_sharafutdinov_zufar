import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Album, ApiAlbumData } from './album.model';
import { ApiArtistData, Artist } from './artist.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  fetchAlbumsWithArtist(artistId: string) {
    return this.http.get<{artist: ApiArtistData, albums:ApiAlbumData[]}>(this.apiUrl + '/albums/withArtist/' + artistId)
      .pipe(map((result) => {
        const artist = new Artist(result.artist._id, result.artist.name, result.artist.image, result.artist.information);
        const albums = result.albums.map((data) => {
          return new Album(data._id, data.artist, data.name, data.image, data.year);
        });
        
        return { artist, albums };
      }));
  }

}
