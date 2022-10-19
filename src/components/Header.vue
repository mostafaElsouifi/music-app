<template>
  <!-- Header -->
  <header id="header" class="bg-gray-900">
    <nav class="container mx-auto flex justify-start items-center px-4 py-5">
      <!--App name -->
      <router-link
        :to="{ name: 'home' }"
        class="text-2xl mr-4 font-bold uppercase text-white"
        exact-active-class="no-active"
        >Music</router-link
      >
      <!-- Navigation links -->
      <div class="flex flex-grow items-center">
        <ul class="mt-1 flex flex-row">
          <li>
            <router-link
              class="text-white px-2 hover:text-yellow-500"
              :to="{ name: 'about' }"
              >{{ $t("header.about") }}</router-link
            >
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a
              class="text-white px-2 hover:text-yellow-500 cursor-pointer"
              @click.prevent="toggleAuthModal"
              >{{ $t("header.register") }}</a
            >
          </li>
          <template v-else>
            <li>
              <router-link
                class="text-white px-2 hover:text-yellow-500 cursor-pointer"
                :to="{ name: 'manage' }"
                >Manage</router-link
              >
            </li>
            <li>
              <a class="text-white px-2" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a href="#" class="px-2 text-white" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapStores } from "pinia";
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";
export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore),
    currentLocale() {
      return this.$i18n.locale === "en" ? "عربي" : "English";
    },
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    signOut() {
      this.userStore.signOut();
      if (this.$route.name === "manage") {
        this.$router.push({ name: "home" });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "en" ? "ar" : "en";
    },
  },
};
</script>
