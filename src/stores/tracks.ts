// Utilities
import { useAxios } from '@/composables/useAxios';
import { defineStore } from 'pinia'
import { ArtistResponseModel } from './artists';
export const useTracksStore = defineStore('tracks', {
  state: () => ({
    list: [] as TracksResponseModel[],
    currentTrack: undefined
  }),
  actions: {
    async get(): Promise<TracksResponseModel[]> {
      const res = await useAxios().get<TracksResponseModel[]>('/api/tracks');
      this.list = res.data;
      return this.list;
    },
    async getById(id: string): Promise<TracksResponseModel> {
      const res = await useAxios().get<TracksResponseModel>('/api/tracks/' + id);
      return res.data;
    },
    setCurrentTrack(track: TracksResponseModel) {
      this.currentTrack = track as any;
      return track;
    },
    prev() {

    },
    next() {

    }
  },
  getters: {
    getCurrentTrack(state): TracksResponseModel | any {
      if (state.currentTrack) {
        return state.currentTrack as TracksResponseModel;
      }
      return undefined;
    }
  }

})
export interface TracksResponseModel {
  id: string;
  title: string;
  image: string;
  duration: number;
  durationText: string;
  url: string;
  albumId: string;
  artistsId: string;
  artist: ArtistResponseModel;
}

