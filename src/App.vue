<template>
  <app-header />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <app-player />
  <auth />
</template>
<script>
import appHeader from "@/components/Header.vue";
import Auth from "@/components/Auth.vue";
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import { auth } from "@/includes/firebase";
import AppPlayer from "@/components/Player.vue";
export default {
  name: "App",
  components: {
    appHeader,
    Auth,
    AppPlayer,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>
<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: all 0.5s linear;
}
.fade-leave-to {
  opacity: 0;
  transition: all 0.5s linear;
}
</style>
