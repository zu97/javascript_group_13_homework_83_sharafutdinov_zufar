import { TracksState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  addHistoryTrackFailure,
  addHistoryTrackRequest,
  addHistoryTrackSuccess,
  addTrackFailure,
  addTrackRequest,
  addTrackSuccess,
  fetchHistoryTrackFailure,
  fetchHistoryTrackRequest,
  fetchHistoryTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess,
  publishTrackFailure,
  publishTrackRequest,
  publishTrackSuccess,
  removeTrackFailure,
  removeTrackRequest,
  removeTrackSuccess
} from './tracks.actions';

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
  addLoading: false,
  addError: null,
  publishLoading: false,
  removeLoading: false,

  historyTracks: [],
  fetchHistoryLoading: false,
  addHistoryLoading: false,
};

export const tracksReducer = createReducer(
  initialState,
  on(fetchTracksRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchTracksSuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks: tracks})),
  on(fetchTracksFailure, state => ({...state, fetchLoading: false})),

  on(addTrackRequest, state => ({...state, addLoading: true, addError: null})),
  on(addTrackSuccess, state => ({...state, addLoading: false})),
  on(addTrackFailure, (state, {error}) => ({...state, addLoading: false, addError: error})),

  on(publishTrackRequest, (state, { id }) => ({...state, publishLoading: id})),
  on(publishTrackSuccess, state => ({...state, publishLoading: false})),
  on(publishTrackFailure, state => ({...state, publishLoading: false})),

  on(removeTrackRequest, (state, { id }) => ({...state, removeLoading: id})),
  on(removeTrackSuccess, state => ({...state, removeLoading: false})),
  on(removeTrackFailure, state => ({...state, removeLoading: false})),

  on(fetchHistoryTrackRequest, state => ({...state, fetchHistoryLoading: true, fetchHistoryError: null})),
  on(fetchHistoryTrackSuccess, (state, {tracks}) => ({...state, fetchHistoryLoading: false, historyTracks: tracks })),
  on(fetchHistoryTrackFailure, state => ({...state, fetchHistoryLoading: false})),

  on(addHistoryTrackRequest, (state, {id}) => ({...state, addHistoryLoading: id, addHistoryError: null})),
  on(addHistoryTrackSuccess, state => ({...state, addHistoryLoading: false})),
  on(addHistoryTrackFailure, state => ({...state, addHistoryLoading: false})),
)
