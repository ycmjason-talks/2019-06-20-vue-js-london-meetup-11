<template>
  <img
    ref="kart"
    src="https://i5.walmartimages.ca/images/Large/905/776/6000196905776.jpg"
    :style="{ top: `${y}%` }"
  />
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
