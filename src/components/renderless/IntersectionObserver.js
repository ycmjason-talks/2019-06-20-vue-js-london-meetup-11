export default {
  props: {
    rootRef: {
      type: Function,
    },
    targetRef: {
      type: Function,
    },
  },
  mounted() {
    const root = this.rootRef();
    const target = this.targetRef();

    this.observer = new window.IntersectionObserver(
      ([entry]) => this.$emit(entry.isIntersecting ? 'intersect-enter' : 'intersect-leave', entry),
      { root },
    );
    this.observer.observe(target);
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  render: () => null,
};
