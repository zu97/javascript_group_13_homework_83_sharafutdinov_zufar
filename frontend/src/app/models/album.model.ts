export class Album {
  constructor(
    public id: string,
    public artist: string,
    public name: string,
    public image: string,
    public year: number
  ) {}
}

export interface ApiAlbumData {
  _id: string,
  artist: string,
  name: string,
  image: string,
  year: number
}
