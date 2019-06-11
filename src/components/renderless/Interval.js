export default {
  props: {
    delay: Number,
    immediate: Boolean,
  },

  mounted() {
    if (this.immediate) {
      this.tick();
    }

    this.id = window.setInterval(this.tick, this.delay);
  },

  beforeDestroy() {
    window.clearInterval(this.id);
  },

  watch: {
    delay () {
        window.clearInterval(this.id);
        this.id = window.setInterval(this.tick, this.delay);
    },
  },

  methods: {
    tick() {
      this.$emit('tick');
    },
  },

  render: () => null,
};
