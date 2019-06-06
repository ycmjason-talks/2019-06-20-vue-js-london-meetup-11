<template>
  <img src="../assets/mariokart.jpg" :style="{ top: `${y}%` }">
</template>

<script>
export default {
  props: {
    y: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
img {
  position: fixed;
  left: 0;
  width: 150px;
}
</style>
