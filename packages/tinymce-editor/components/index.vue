<template>
  <div>
    <ae-tinymce></ae-tinymce>
    <ae-button @click="clickHandler">Check</ae-button>
    <ae-gutter :issues="issues"></ae-gutter>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

import tinymceVue from "./tinymce.vue";
import buttonVue from "./button.vue";
import gutter from "./gutter.vue";

export default {
  name: "accessible-editor",
  components: { tinymceVue, buttonVue, gutter },
  setup() {
    const issues = ref({});
    const clickHandler = async () => {
      const result = await fetch("http://localhost:3000/");
      const json = await result.json();

      console.log(json);
    };
    return {
      clickHandler,
      issues,
    };
  },
};
</script>
