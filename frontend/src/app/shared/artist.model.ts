export class Artist {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public information: string
  ) {}
}

export interface ApiArtistData {
  _id: string,
  name: string,
  image: string,
  information: string
}
