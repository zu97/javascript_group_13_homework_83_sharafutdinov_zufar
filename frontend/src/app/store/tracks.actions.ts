import { createAction, props } from '@ngrx/store';
import { AddTrackData, HistoryTrack, Track, TrackError } from '../models/track.model';

export const fetchTracksRequest = createAction('[Tracks] Fetch Request', props<{ albumId: string }>());
export const fetchTracksSuccess = createAction('[Tracks] Fetch Success', props<{ tracks: Track[] }>());
export const fetchTracksFailure = createAction('[Tracks] Fetch Failure');

export const addTrackRequest = createAction('[Tracks] Add Request', props<{ trackData: AddTrackData }>());
export const addTrackSuccess = createAction('[Tracks] Add Success');
export const addTrackFailure = createAction('[Tracks] Add Failure', props<{ error: null | TrackError }>());

export const publishTrackRequest = createAction('[Tracks] Publish Request', props<{ id: string }>());
export const publishTrackSuccess = createAction('[Tracks] Publish Success');
export const publishTrackFailure = createAction('[Tracks] Publish Failure');

export const removeTrackRequest = createAction('[Tracks] Remove Request', props<{ id: string }>());
export const removeTrackSuccess = createAction('[Tracks] Remove Success');
export const removeTrackFailure = createAction('[Tracks] Remove Failure');

export const fetchHistoryTrackRequest = createAction('[Tracks] Fetch History Request');
export const fetchHistoryTrackSuccess = createAction('[Tracks] Fetch History Success', props<{ tracks: HistoryTrack[] }>());
export const fetchHistoryTrackFailure = createAction('[Tracks] Fetch History Failure');

export const addHistoryTrackRequest = createAction('[Tracks] Add History Request', props<{ id: string }>());
export const addHistoryTrackSuccess = createAction('[Tracks] Add History Success');
export const addHistoryTrackFailure = createAction('[Tracks] Add History Failure');

