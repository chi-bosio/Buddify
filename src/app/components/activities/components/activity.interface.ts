export interface Activity{
    id: string,
    category: {id:string;name:string},
    creator: {name:string;lastname:string;avatar:string;},
    date: string,
    description: string,
    image: string,
    latitude: string,
    longitude: string
    name: string,
    place: string,
    time: string,
  }