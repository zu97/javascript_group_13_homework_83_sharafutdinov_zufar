export interface Track {
  _id: string,
  name: string,
  duration: string,
  album: string,
  youtube?: string,
}

export interface HistoryTrack {
  _id: string,
  track: {
    name: string,
    album: {
      artist: {
        name: string,
      }
    },
  },
  datetime: string,
}
