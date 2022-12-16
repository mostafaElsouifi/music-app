<template>
  <div
    class="text-white text-center font-bold p-4 mb-4 rounded"
    v-if="show_alert"
    :class="alert_variant"
  >
    {{ alert_message }}
  </div>
  <!--Login Form -->
  <vee-form :validation-schema="loginSchema" @submit="login">
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

    <div>
      <label for="password" class="block mb-2 text-lg">Password:</label>
      <vee-field
        name="password"
        type="password"
        placeholder="password"
        class="border border-gray-400 w-full rounded px-3 py-1 focus:outline-none focus:border-black text-lg text-gray-700"
      />
      <ErrorMessage class="text-red-500" name="password" />
    </div>
    <div class="mt-5 pl-2">
      <a
        @click="displayResetForm"
        class="text-black hover:border-b hover:border-black cursor-pointer"
        >Forgot your password</a
      >
    </div>

    <!--submit button -->
    <button
      type="submit"
      class="my-3 w-full bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded"
      :disabled="login_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>
<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";
export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email|max:100",
        password: "required|min:9|max:100|excluded:password",
      },
      login_in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_message: "Please wait! We loggin you in.",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate", "resetPassword"]),
    async login(values) {
      this.login_in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please wait! We loggin you in.";
      try {
        await this.authenticate(values);
      } catch (error) {
        this.login_in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_message = "Invalid loggin details";
        return;
      }
      this.alert_variant = "bg-green-500";
      this.alert_message = "Success! You logged  in.";
      window.location.reload();
    },
    displayResetForm() {
      this.$emit("display-reset-form");
    },
  },
};
</script>
