import { createAction, props } from '@ngrx/store';
import { HistoryTrack, Track } from '../models/track.model';

export const fetchTracksRequest = createAction('[Tracks] Fetch Request', props<{ albumId: string }>());
export const fetchTracksSuccess = createAction('[Tracks] Fetch Success', props<{ tracks: Track[] }>());
export const fetchTracksFailure = createAction('[Tracks] Fetch Failure');

export const fetchHistoryTrackRequest = createAction('[Tracks] Fetch History Request');
export const fetchHistoryTrackSuccess = createAction('[Tracks] Fetch History Success', props<{ tracks: HistoryTrack[] }>());
export const fetchHistoryTrackFailure = createAction('[Tracks] Fetch History Failure');

export const addHistoryTrackRequest = createAction('[Tracks] Add History Request', props<{ id: string }>());
export const addHistoryTrackSuccess = createAction('[Tracks] Add History Success');
export const addHistoryTrackFailure = createAction('[Tracks] Add History Failure');
