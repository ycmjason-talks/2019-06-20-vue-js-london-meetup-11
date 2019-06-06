<template>
  <div class="modal" v-if="opened">
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal__content {
  background: white;
  padding: 2rem;
  border-radius: 0rem 1rem 2rem 3rem;
}
</style>
