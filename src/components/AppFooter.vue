<template>
  <v-footer class="bg-black" app>
    <v-container fluid>
      <v-row>
        <v-col class="d-flex text-align-left" col-lg="1" col="3">
          <v-card color="black">
            <div class="d-flex flex-no-wrap ">
              <v-avatar class="ma-3" rounded="0" size="125">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
              </v-avatar>
              <div v-if="track">
                <v-card-title class="text-h5">
                  {{ track.title }}
                </v-card-title>
                <v-card-subtitle>{{ track.artist.name }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn class="ms-2" icon="fas fa-play" variant="text"></v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col col="3">
          <v-row>
            <v-col class="text-center">
              <v-btn class="bg-white text-grey ms-2" icon="fas fa-shuffle"></v-btn>
              <v-btn class="bg-white text-black ms-2" icon="fas fa-backward-step"></v-btn>
              <v-btn v-if="play" @click="playHandler" class="bg-white text-black ms-2" icon="fas fa-pause"></v-btn>
              <v-btn v-else @click="playHandler" class="bg-white text-black ms-2" icon="fas fa-play"></v-btn>
              <v-btn class="bg-white text-black ms-2" icon="fas fa-forward-step"></v-btn>
              <v-btn class="bg-white text-grey ms-2" icon="fas fa-repeat"></v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="3">
              <v-slider v-model="duration" @click="seekHandler" color="grey"></v-slider>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-col class="text-right">
              <v-btn class="bg-white text-grey ms-2" icon="far fa-heart"></v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-slider v-model="volume" @update:modelValue="volumeHandler" @click:prepend="mutedHandler"
                :prepend-icon="volumeIconHandler"></v-slider>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const track = ref<TracksResponseModel | any>(null)
const trackPlayTime = ref(0);
const duration = ref(0);
const player = ref(new Audio);
const play = ref(false);
const volume = ref(50)
const _volume = ref(0)
const muted = ref(false)

const seeker = ref(false);

const seekHandler = () => {
  const seekTo = (duration.value * track.value.duration) / 100;
  player.value.currentTime = seekTo;
}
const volumeIconHandler = computed(() => {
  if (volume.value >= 50) {
    return 'fas fa-volume-high'
  } else if (volume.value < 50 && volume.value > 5) {
    return 'fas fa-volume-low'
  } else if (volume.value < 5 && volume.value > 1) {
    return 'fas fa-volume-off'
  }
  return 'fas fa-volume-xmark'
})
const mutedHandler = () => {
  muted.value = !muted.value;
  if (muted.value) {
    _volume.value = volume.value;
    volume.value = 0;
  } else {
    volume.value = _volume.value;
  }

}
watch(volume, async (newValue, oldValue) => {
  if (newValue > 1) {
    muted.value = false;
  } else {
    muted.value = true;
  }
})

watch(muted, async (newStatus, oldStatus) => {
  player.value.muted = newStatus;
})
const volumeHandler = () => {
  player.value.volume = volume.value * 0.01
  if (volume.value < 1) {
    muted.value = true;
  } else {
    muted.value = false;
  }
}

import { TracksResponseModel, useTracksStore } from '../stores/tracks';
const tracksStore = await useTracksStore();

onMounted(async () => {
})
const playHandler = () => {
  play.value = !play.value
  if (play.value) {
    player.value.play()

  } else {
    player.value.pause()
  }

}

const prevHandler = () => {

}

const nextHandler = () => {

}

onMounted(async () => {
  const data = await tracksStore.get()
  tracksStore.setCurrentTrack(data[0])
  track.value = data[0];
  player.value = new Audio(track.value.url);
  player.value.addEventListener('timeupdate', function (e) {
    e.preventDefault();
    if (!seeker.value) {
      trackPlayTime.value = this.currentTime;
      duration.value = (trackPlayTime.value / track.value.duration) * 100
      if (duration.value > 100) {
        player.value.src = 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/689/underrated-feat-sunny-lukas-1717498853-r0PbfV6FZf.mp3'
        player.value.play();
      }
    }
  })
  player.value.volume = volume.value * 0.01
})
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
