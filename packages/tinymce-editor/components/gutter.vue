<template>
  <div>
    <div>
      <span class="">Accessibility Check</span>
      <span>{issues.length} Issues Found</span>
    </div>
    <ae-collapsible>
      <template name="headline">Contrast ({issues.length} Issues)</template>
      <template name="open">
        <span></span>
      </template>
      <template name="closed"> </template>
    </ae-collapsible>
  </div>
</template>

<script>
import collapsible from "./collapsible.vue";

export default {
  name: "ae-gutter",
  components: { "ae-collapsible": collapsible },
};
</script>

<style></style>
