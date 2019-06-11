export default {
  props: {
    delay: Number,
    immediate: Boolean,
  },

  mounted() {
    if (this.immediate) {
      this.tick();
    }
  },

  watch: {
    delay: {
      immediate: true,
      handler() {
        window.clearInterval(this.id);
        this.id = window.setInterval(this.tick, this.delay);
      },
    },
  },

  methods: {
    tick() {
      this.$emit('tick');
    },
  },

  render: () => null,
};
