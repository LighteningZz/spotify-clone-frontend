// Utilities

import { useAxios } from '@/composables/useAxios';
import { defineStore } from 'pinia'
export const useArtistsStore = defineStore('artists', {
  state: () => ({
    list: [] as ArtistResponseModel[]
  }),
  actions: {
    async get() {
      const res = await useAxios().get<ArtistResponseModel[]>('/api/artists');
      this.list = res.data;
      return this.list;
    },
    async getById(id: string) {
      const res = await useAxios().get<ArtistResponseModel>('/api/artists/' + id);
      return res.data;
    },
  },
  getters: {

  }

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
