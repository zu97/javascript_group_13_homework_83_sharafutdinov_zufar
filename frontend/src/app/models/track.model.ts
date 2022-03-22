export interface Track {
  _id: string,
  name: string,
  duration: string,
  album: string,
  youtube?: string,
  isPublished: boolean,
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


export interface AddTrackData {
  [key: string]: any;
  album: string;
  name: string;
  duration: string;
  youtube?: string;
}

interface FieldError {
  message: string;
}

export interface TrackError {
  errors: {
    album?: undefined | FieldError;
    name?: undefined | FieldError;
    duration?: undefined | FieldError;
    youtube?: undefined | FieldError;
  }
}
