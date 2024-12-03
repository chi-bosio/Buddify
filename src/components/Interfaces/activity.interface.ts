export interface Activity{
    id: string,
    category: {id:string;name:string},
    creator: {name:string;lastname:string;avatar:string;isPremium:boolean;},
    date: string,
    description: string,
    image: string,
    latitude: string,
    longitude: string
    name: string,
    place: string,
    time: string,
    status:ActivityStatus,
  }
export enum ActivityStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}