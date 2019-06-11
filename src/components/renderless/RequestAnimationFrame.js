import recursiveRequestAnimationFrame from '../../services/recursiveRequestAnimationFrame';

export default {
  mounted() {
    this.cancelAnimationFrame = recursiveRequestAnimationFrame(this.onFrame);
    this.lastFrameTime = window.performance.now();
  },

  beforeDestroy() {
    this.cancelAnimationFrame();
  },

  methods: {
    onFrame() {
      const now = window.performance.now();
      const timeElapsed = now - this.lastFrameTime;
      this.lastFrameTime = now;
      this.$emit('frame', timeElapsed);
    },
  },

  render: () => null,
};
