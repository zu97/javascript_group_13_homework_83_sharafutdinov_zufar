export interface Album {
  _id: string;
  artist: string;
  name: string;
  image: string;
  year: number;
  isPublished: boolean;
}

export interface AlbumWithArtist {
  _id: string;
  artist: {
    _id: string;
  };
  name: string;
  image: string;
  year: number;
  isPublished: boolean;
}


export interface AddAlbumData {
  [key: string]: any;
  artist: string;
  name: string;
  image: string;
  year: string;
}

interface FieldError {
  message: string;
}

export interface AlbumError {
  errors: {
    artist?: undefined | FieldError;
    name?: undefined | FieldError;
    image?: undefined | FieldError;
    year?: undefined | FieldError;
  }
}
