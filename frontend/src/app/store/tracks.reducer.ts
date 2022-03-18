import { TracksState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  addHistoryTrackFailure,
  addHistoryTrackRequest,
  addHistoryTrackSuccess,
  fetchHistoryTrackFailure,
  fetchHistoryTrackRequest,
  fetchHistoryTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess
} from './tracks.actions';

const initialState: TracksState = {
  tracks: [],
  historyTracks: [],
  fetchLoading: false,
  fetchHistoryLoading: false,
  addHistoryLoading: false,
};

export const tracksReducer = createReducer(
  initialState,
  on(fetchTracksRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchTracksSuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks: tracks})),
  on(fetchTracksFailure, state => ({...state, fetchLoading: false})),
  on(fetchHistoryTrackRequest, state => ({...state, fetchHistoryLoading: true, fetchHistoryError: null})),
  on(fetchHistoryTrackSuccess, (state, {tracks}) => ({...state, fetchHistoryLoading: false, historyTracks: tracks })),
  on(fetchHistoryTrackFailure, state => ({...state, fetchHistoryLoading: false})),
  on(addHistoryTrackRequest, (state, {id}) => ({...state, addHistoryLoading: id, addHistoryError: null})),
  on(addHistoryTrackSuccess, state => ({...state, addHistoryLoading: false})),
  on(addHistoryTrackFailure, state => ({...state, addHistoryLoading: false})),
)
