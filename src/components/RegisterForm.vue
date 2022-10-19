<template>
  <div
    class="text-white text-center rounded p-4 mb-4 font-bold"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_message }}
  </div>
  <vee-form
    :validation-schema="schema"
    :initial-values="userData"
    @submit="register"
  >
    <!--name-->
    <div class="mb-3">
      <label for="Name" class="block mb-2 text-lg">Name:</label>
      <vee-field
        name="name"
        type="text"
        placeholder="Enter Name"
        class="border border-gray-400 w-full rounded px-3 py-1 focus:outline-none focus:border-black text-lg text-gray-700"
      />
      <ErrorMessage class="text-red-500" name="name" />
      <!--Email-->
    </div>
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
    <!--Age-->
    <div class="mb-3">
      <label for="age" class="block mb-2 text-lg">Age:</label>
      <vee-field
        name="age"
        type="text"
        class="border border-gray-400 w-full rounded px-3 py-1 focus:outline-none focus:border-black text-lg text-gray-700"
      />
      <ErrorMessage class="text-red-500" name="age" />
    </div>
    <!--Gender-->
    <div class="mb-3">
      <label for="gender" class="block mb-2 text-lg">Gender:</label>
      <vee-field name="gender" type="radio" class="mr-2" value="male" />
      <label class="mr-5">Male</label>
      <vee-field name="gender" type="radio" class="mr-2" value="female" />
      <label>Female</label>

      <ErrorMessage class="text-red-500 block" name="gender" />
    </div>
    <!--Password -->
    <div class="mb-3">
      <label for="password" class="block mb-2 text-lg">Password:</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          placeholder="Password"
          class="border border-gray-400 w-full rounded px-3 py-1 focus:outline-none focus:border-black text-lg text-gray-700"
          v-bind="field"
        />
        <div class="text-red-500" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>

    <div class="mb-3">
      <label for="confirmPassword" class="block mb-2 text-lg"
        >Confirm Password:</label
      >
      <vee-field
        name="confirm_password"
        type="password"
        placeholder="Confirm Passeord"
        class="border border-gray-400 w-full rounded px-3 py-1 focus:outline-none focus:border-black text-lg text-gray-700"
      />
      <ErrorMessage class="text-red-500" name="confirm_password" />
    </div>
    <!--Country -->
    <div class="mb-3">
      <label for="country" class="block mb-2 text-lg">Country:</label>
      <vee-field
        as="select"
        name="country"
        class="border border-gray-400 w-full rounded px-3 py-1 focus:outline-none focus:border-black text-lg"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-500" name="country" />
    </div>

    <!--Accept terms checkbox -->
    <!--tos-->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded cursor-pointer"
      />
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        <a href="#">{{ $t("register.tos") }}</a>
      </i18n-t>
      <ErrorMessage class="text-red-500 block" name="tos" />
    </div>

    <!-- Submit button-->
    <button
      type="submit"
      class="my-3 w-full bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>
<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";
export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:18|max_value:90",
        password: "required|min:9|max:100|excluded:password",
        confirm_password: "passwords_mismatch:@password",
        country: "excluded_country:Antarctica",
        tos: "tos",
        gender: "required",
      },
      userData: {
        country: "USA",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_message: "Please wait! your account is being created .",
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_message = "Please wait! your account is being created.";
      try {
        await this.createUser(values);
      } catch (error) {
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_message =
          "Unexpected Error happen, please try again later";
        return;
      }

      this.reg_alert_variant = "bg-green-500";
      this.reg_alert_message = "Success! your account has been created.";
      window.location.reload();
    },
  },
};
</script>
<style scoped>
a:hover {
  color: orange;
}
</style>
