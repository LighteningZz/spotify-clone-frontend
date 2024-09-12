// Utilities
import { defineStore } from 'pinia'
export const useTracksStore = defineStore('tracks', () => {

})
export interface ArtistResponseModel {
  id: string;
  name: string;
  image: string;
  _count: Count;
}

export interface Count {
  albums: number;
}
