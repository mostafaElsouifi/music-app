<template>
  <div
    class="text-white text-center font-bold p-4 mb-4 rounded"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_message }}
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
      login_show_alert: false,
      login_alert_variant: "bg-blue-500",
      login_alert_message: "Please wait! We loggin you in.",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = "bg-blue-500";
      this.login_alert_message = "Please wait! We loggin you in.";
      try {
        await this.authenticate(values);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = "bg-red-500";
        this.login_alert_message = "Invalid loggin details";
        return;
      }
      this.login_alert_variant = "bg-green-500";
      this.login_alert_message = "Success! You logged  in.";
      window.location.reload();
    },
  },
};
</script>
