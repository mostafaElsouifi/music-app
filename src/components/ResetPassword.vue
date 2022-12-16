<template>
  <div>
    <div class="fixed top-0 min-h-full min-w-full bg-gray-600 opacity-75"></div>
    <div calss="flex justify-center items-center">
      <div
        class="fixed container max-w-lg mx-auto p-3 border border-gray-400 rounded my-5 bg-white overflow-y-auto top-20 left-0 right-0"
      >
        <a
          @click="displayLogin"
          class="hover:border-b hover:border-black cursor-pointer text-xs"
          >Back to login</a
        >
        <div class="flex justify-between items-center pb-4">
          <h1 class="font-bold text-2xl">Reset your password</h1>
          <!-- Modal Close Button -->
          <div
            class="modal-close cursor-pointer z-50 absolute right-5 top-2"
            @click="hideResetForm"
          >
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div
          class="text-white text-center font-bold p-4 mb-4 rounded"
          v-if="show_alert"
          :class="alert_variant"
        >
          {{ alert_message }}
        </div>
        <!--Forms-->
        <vee-form @submit="sendResetEmail" :validation-schema="schema">
          <div class="mb-3">
            <label for="email" class="block mb-2 text-lg">Email:</label>
            <vee-field
              name="email"
              type="text"
              placeholder="Enter Email"
              class="border border-gray-400 w-full rounded px-3 py-1 focus:outline-none focus:border-black text-lg text-gray-700"
            />
            <ErrorMessage class="text-red-500" name="email" />
          </div>

          <!--submit button -->
          <button
            type="submit"
            class="my-3 w-full bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded"
          >
            Submit
          </button>
        </vee-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user.js";
export default {
  name: "ResetPassword",
  data() {
    return {
      schema: {
        email: "required|email|",
      },
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_message: "",
    };
  },
  computed: {},
  methods: {
    ...mapActions(useUserStore, ["resetPassword"]),
    hideResetForm() {
      this.$emit("hideResetForm");
    },
    displayLogin() {
      this.$emit("display-login");
    },
    async sendResetEmail(values) {
      console.log(values.email);
      try {
        await this.resetPassword(values.email);
        this.alert_variant = "bg-blue-500";
        this.show_alert = true;
        this.alert_message =
          "if you have account,please check your inbox or spam ";
        setTimeout(() => {
          this.show_alert = false;
        }, 3000);
      } catch (error) {
        this.alert_variant = "bg-red-500";
        this.show_alert = true;
        this.alert_message = error.message;
        setTimeout(() => {
          this.show_alert = false;
        }, 3000);
      }
    },
  },
};
</script>
