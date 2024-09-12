<template>
    <v-infinite-scroll :height="300" :items="items">
        <template v-for="(item, index) in items" :key="item">
            <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
                Item number #{{ item }}
            </div>
        </template>
    </v-infinite-scroll>
</template>
<script lang="ts" setup>
import { TracksResponseModel, useTracksStore } from '@/stores/tracks';

const tracksStore = await useTracksStore();
const data = await tracksStore.get()
const currentTrack = data[0] as TracksResponseModel;
tracksStore.setCurrentTrack(currentTrack)
const items = computed(() => tracksStore.list)

</script>