<template>
  <!--Player-->
  <div class="fixed bottom-0 left-0 w-full bg-white p-4">
    <!--track info -->
    <div class="text-center" v-if="current_song.modified_name">
      <span class="song-title font-bold"
        >{{ current_song.modified_name }}
      </span>
      by
      <span class="song-artist">{{ current_song.display_name }}</span>
    </div>

    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play / pause button-->
      <button @click.prevent="toggleAudio">
        <i
          class="fa text-gray-500 text-xl"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </button>
      <!--current position-->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub container -->
      <div
        @click.prevent="updateSeek"
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
      >
        <!--Player ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import usePlayerStore from "@/stores/player";
export default {
  name: "Player",
  methods: {
    ...mapActions(usePlayerStore, ["toggleAudio", "updateSeek"]),
  },
  computed: {
    ...mapState(usePlayerStore, [
      "playing",
      "seek",
      "duration",
      "playerProgress",
      "current_song",
    ]),
  },
};
</script>
