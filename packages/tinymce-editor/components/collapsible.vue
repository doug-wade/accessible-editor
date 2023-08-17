<template>
  <div>
    <div v-if="isOpen">
      <ae-icon name="plus"></ae-icon>
      <slot name="headline"></slot>
      <span><slot name="open"></slot></span>
    </div>
    <div v-else>
      <ae-icon name="minus"></ae-icon>
      <slot name="headline"></slot>
      <span><slot name="closed"></slot></span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "ae-collapsible",
  setup() {
    const isOpen = ref(false);
    const clickHandler = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isOpen,
      clickHandler,
    };
  },
});
</script>
