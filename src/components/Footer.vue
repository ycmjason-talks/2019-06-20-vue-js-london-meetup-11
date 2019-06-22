<template>
  <footer :style="footerStyle">
    <Interval :delay="footerIntervalMs" @tick="randomFooterStyle" immediate></Interval>
    <Interval :delay="textIntervalMs" @tick="randomTextStyle" immediate></Interval>
    <div class="text" :style="textStyle">Made with ❤ by Jason Yu &copy; 2019</div>
    <label class="insane-mode-label">
      <input type="checkbox" v-model="insaneMode"> Insane Mode (new!)
    </label>
  </footer>
</template>

<script>
import { randomNumber, randomPercentage, randomColor } from '../services/random';
import Interval from './renderless/Interval';

const FOOTER_INTERVAL_MS = 543;
const TEXT_INTERVAL_MS = FOOTER_INTERVAL_MS / 3;

export default {
  components: { Interval },

  data: () => ({
    footerStyle: null,
    textStyle: null,
    insaneMode: false,
  }),

  computed: {
    insaneFactor() {
      return this.insaneMode ? 3 : 1;
    },

    footerIntervalMs() {
      return FOOTER_INTERVAL_MS / this.insaneFactor;
    },

    textIntervalMs() {
      return FOOTER_INTERVAL_MS / this.insaneFactor;
    },
  },

  methods: {
    randomFooterStyle() {
      const { insaneFactor } = this;
      this.footerStyle = {
        borderRadius: `${randomPercentage()} ${randomPercentage()} / ${randomPercentage()} ${randomPercentage()}`,
        background: randomColor(),
        transitionDuration: `${FOOTER_INTERVAL_MS / insaneFactor}ms`,
      };
    },

    randomTextStyle() {
      const { insaneFactor } = this;
      this.textStyle = {
        transform: `rotate(${randomNumber(
          -3 * insaneFactor,
          3 * insaneFactor,
        )}deg) scale(${randomNumber(0.7 * insaneFactor, 1.3 * insaneFactor)})`,
        color: randomColor(),
        transitionDuration: `${TEXT_INTERVAL_MS / insaneFactor}ms`,
      };
    },
  },
};
</script>

<style scoped>
footer {
  margin-top: 1rem;
  padding: 3rem 0;
  transition-property: border-radius, background;
  text-align: center;
}

footer .text {
  transition-property: color, transform;
}

.insane-mode-label {
  display: block;
  margin-top: 2rem;
}
</style>
