export default {
  props: {
    delay: Number,
  },
  mounted() {
    this.id = window.setTimeout(() => this.$emit('timeout'), this.delay);
  },
  beforeDestroy() {
    window.clearTimeout(this.id);
  },
  render: () => null,
};
