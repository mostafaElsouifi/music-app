<template>
  <!--Auth modal-->
  <div :class="hiddenClass" id="modal">
    <div class="fixed top-0 min-h-full min-w-full bg-gray-600 opacity-75"></div>
    <div calss="flex justify-center items-center">
      <div
        class="fixed container max-w-lg mx-auto p-3 border border-gray-400 rounded my-5 bg-white overflow-y-auto top-0 left-0 right-0"
        :class="{
          'bottom-0': tab === 'register',
          'bottom-auto': tab === 'login',
        }"
      >
        <div class="flex justify-between items-center pb-4">
          <h1 class="font-bold text-2xl">{{ $t("auth_modal.account") }}</h1>
          <!-- Modal Close Button -->
          <div
            class="modal-close cursor-pointer z-50"
            @click="modalVisibality = false"
          >
            <i class="fas fa-times"></i>
          </div>
        </div>
        <!--tabs-->
        <div class="tabs my-5">
          <button
            class="py-1 px-20 rounded text-xl"
            :class="{
              'text-white bg-cyan-500': tab === 'login',
              'bg-white text-cyan-500 hover:text-cyan-800': tab === 'register',
            }"
            @click="tab = 'login'"
          >
            {{ $t("auth_modal.login") }}
          </button>
          <button
            class="py-1 px-20 rounded text-xl"
            :class="{
              'text-white bg-cyan-500': tab === 'register',
              'bg-white text-cyan-500 hover:text-cyan-800': tab === 'login',
            }"
            @click="tab = 'register'"
          >
            {{ $t("auth_modal.register") }}
          </button>
        </div>
        <!--Forms-->
        <app-login-form v-if="tab === 'login'" />
        <app-register-form v-if="tab === 'register'" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapWritableState } from "pinia";
import useModalStore from "@/stores/modal";
import AppLoginForm from "@/components/LoginForm.vue";
import AppRegisterForm from "@/components/RegisterForm.vue";
export default {
  name: "Auth",
  components: {
    AppLoginForm,
    AppRegisterForm,
  },
  data() {
    return {
      tab: "login",
    };
  },
  computed: {
    ...mapState(useModalStore, ["hiddenClass"]),
    ...mapWritableState(useModalStore, {
      modalVisibality: "isOpen",
    }),
  },
  methods: {},
};
</script>
