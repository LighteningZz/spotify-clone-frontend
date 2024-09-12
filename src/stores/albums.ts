// Utilities
import { defineStore } from 'pinia'
export const useAlbumsStore = defineStore('Albums', () => {

})
export interface AlbumsResponseModel {
  id: string;
  name: string;
  image: string;
  _count: TracksCount;
}

export interface TracksCount {
  tracks: number;
}
