export interface Artist {
  _id: string,
  name: string,
  image: string,
  information: null | string,
  isPublished: boolean
}

export interface AddArtistData {
  [key: string]: any;
  name: string;
  information?: string;
  image: string;
}

interface FieldError {
  message: string;
}

export interface ArtistError {
  errors: {
    name?: undefined | FieldError;
    information?: undefined | FieldError;
    image?: undefined | FieldError;
  }
}
