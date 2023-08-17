<template>
  <span>{emoji}</span>
</template>

<script>
export default {
  setup({ name }) {
    let emoji;
    if (name === "plus") {
      emoji = "➕";
    } else if (name === "minus") {
      emoji = "➖";
    }

    return {
      emoji,
    };
  },
};
</script>
