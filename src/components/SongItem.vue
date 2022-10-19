<template>
  <li
    class="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docID } }"
        class="block font-bold text-gray-600"
        >{{ song.modified_name }}</router-link
      >
      <span class="text-sm text-gray-500">{{ song.display_name }}</span>
    </div>
    <div class="text-gray-600 text-lg">
      <router-link
        custom
        :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span class="mr-3" @click="navigate">
          {{ song.comment_count }}
          <i class="fa fa-comments text-gray-600"></i>
        </span>
      </router-link>
    </div>
  </li>
</template>
<script>
export default {
  name: "SongItem",
  props: ["song"],
};
</script>
