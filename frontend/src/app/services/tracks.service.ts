import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { AddTrackData, HistoryTrack, Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(
    private http: HttpClient,
  ) {}

  fetchTracks(albumId: string) {
    return this.http.get<Track[]>(env.apiUrl + '/tracks?album=' + albumId);
  }

  addTrack(trackData: AddTrackData) {
    return this.http.post(env.apiUrl + '/tracks', trackData);
  }

  publishTrack(id: string) {
    return this.http.post(env.apiUrl + '/tracks/' + id + '/publish', {});
  }

  removeTrack(id: string) {
    return this.http.delete(env.apiUrl + '/tracks/' + id);
  }

  fetchHistoryTracks(token: string) {
    return this.http.get<HistoryTrack[]>(env.apiUrl + '/track_history', {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    });
  }

  addHistoryTrack(token: string, id: string) {
    return this.http.post(env.apiUrl + '/track_history', { track: id }, {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    });
  }

}
