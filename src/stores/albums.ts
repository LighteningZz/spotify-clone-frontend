// Utilities
import { useAxios } from '@/composables/useAxios';
import { defineStore } from 'pinia'
export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    list: [] as AlbumsResponseModel[]
  }),
  actions: {
    async get() {
      const res = await useAxios().get<AlbumsResponseModel[]>('/api/albums');
      this.list = res.data;
      return this.list;
    },
    async getById(id: string) {
      const res = await useAxios().get<AlbumsResponseModel>('/api/albums/' + id);
      return res.data;
    },
  },
  getters: {

  }
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
