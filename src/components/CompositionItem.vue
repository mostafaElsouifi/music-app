<template>
  <div class="border border-gray-200 rounded p-3 mb-5">
    <!---->
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="float-right text-white bg-red-500 ml-1 py-1 px-2 text-sm"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm bg-blue-500 text-white float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <!---->
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-3"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form
        :validation-schema="schema"
        :initial-values="song"
        @submit="edit"
      >
        <div class="mb-3">
          <label class="my-4">Song Title</label>
          <vee-field
            type="text"
            name="modified_name"
            :placeholder="song.modified_name"
            class="rounded w-full border border-gray-200 px-3 py-2 my-3 ransition duration-500 focus:outline-none focus:border-black"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="my-4">Gener</label>
          <vee-field
            type="text"
            name="gener"
            placeholder="Enter Genre"
            class="rounded w-full border border-gray-200 px-3 py-2 my-3 transition duration-500 focus:outline-none focus:border-black"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="gener" />
        </div>
        <button
          class="py-2 px-4 mr-2 bg-green-600 rounded text-white tex-lg cursot pointer transition duration-500 hover:bg-green-500"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          class="py-2 px-4 bg-gray-600 rounded text-white tex-lg cursot pointer transition duration-500 hover:bg-gray-500"
          :disabled="in_submission"
          @click="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from "../includes/firebase";

export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      showForm: false,
      displayLoading: false,
      schema: {
        modified_name: "required",
        gener: "alpha_spaces",
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_message: "Please Wait! updating song info.",
    };
  },
  methods: {
    async edit(values) {
      this.$emit("display-loading");
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please Wait! updating song info.";
      try {
        await songsCollection.doc(this.song.docID).update(values);
        this.$emit("hide-loading");
      } catch (e) {
        this.$emit("hide-loading");

        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_message = "Something went wrong! please try again later";
        return;
      }
      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);
      this.in_submission = false;
      this.alert_variant = "bg-green-500";
      this.alert_message = "Success!";
    },
    async deleteSong() {
      this.$emit("display-loading");
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);
      await songRef.delete();
      await songsCollection.doc(this.song.docID).delete();
      this.$emit("hide-loading");
      this.removeSong(this.index);
    },
  },
};
</script>

<style></style>
