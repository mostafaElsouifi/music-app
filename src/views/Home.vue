<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(/assets/img/header2.jpg)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white text-center main-header-content">
          <h1 class="text-5xl font-bold mb-6">{{ $t("home.listen") }}</h1>
          <!-- <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            iusto quos, voluptatum dolorem assumenda tenetur ducimus magni
            voluptas! Autem, tenetur ullam. Fugit, ipsa exercitationem? Saepe
          </p> -->
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
        >
          <span class="card-title">{{ $t("home.songs") }}</span>
        </div>
        <!-- PlayList -->
        <ol id="playlist">
          <app-song-item v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
      </div>
    </section>
  </main>
</template>
<script>
import AppSongItem from "@/components/SongItem.vue";
import { songsCollection } from "../includes/firebase";
import iconSecondary from "@/directives/icon-secondary";
export default {
  name: "Home",
  components: {
    AppSongItem,
  },
  directives: {
    "icon-secondary": iconSecondary,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 4,
      pendingRequest: false,
    };
  },
  async created() {
    this.getSongs();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { offsetHeight, scrollTop } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight > offsetHeight - 100;
      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) return;
      let snapshots;
      this.pendingRequest = true;
      if (this.songs.length) {
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docID)
          .get();
        snapshots = await songsCollection
          .orderBy("modified_name")
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy("modified_name")
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });
      this.pendingRequest = false;
    },
  },
};
</script>
