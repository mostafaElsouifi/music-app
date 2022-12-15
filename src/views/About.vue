<template>
  <div class="container mx-auto my-10 text-xl">
    <h1 class="my-7">
      This app is created with Vue js and Firebase . A user can create an
      account by email an dstart share musics and interact with others .
    </h1>
    <h2 class="mt-5">Technologies used :</h2>
    <div class="flex flex-wrap justify-around ml-10 mt-10">
      <p class="flex flex-col items-center gap-5 text-3xl">
        Vue.js <vue-icon class="w-13" />
      </p>
      <p class="flex flex-col items-center gap-5 text-3xl">
        Firebase <firebase-icon />
      </p>
      <p class="flex flex-col items-center gap-5 text-3xl">
        TailwindCss <tailwindcss-icon class="w-13" />
      </p>
    </div>
  </div>
</template>
<script>
import VueIcon from "@/assets/icons/vue.svg";
import FirebaseIcon from "@/assets/icons/firebase.svg";
import TailwindcssIcon from "@/assets/icons/tailwindcss.svg";
export default {
  name: "About",
  components: { VueIcon, FirebaseIcon, TailwindcssIcon },
};
</script>
