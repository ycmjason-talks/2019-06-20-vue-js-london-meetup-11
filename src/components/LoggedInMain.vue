<template>
  <main>
    <p>Hi Vue.js London. Welcome to my AMAZING WEBSITE.</p>

    <!-- 1. mario kart -->
    <fieldset>
      <legend>Control the speed of the mario</legend>
      <input type="range" min="0" max="100" v-model="marioKartSpeed" />
    </fieldset>
    <MarioKart :y="marioKartY"></MarioKart>

    <!-- 2. lorem ipsum paragraphs -->
    <article class="infinite-lorem" ref="loremsContainer">
      <h2>KEEP SCROLLIN&rsquo;</h2>
      <p v-for="(paragraph, i) of paragraphs" :key="i">{{ paragraph }}</p>
      <div ref="loremTrigger">Loading...</div>
    </article>

    <!-- 3. logout modal -->
    <LogoutModal :opened="logoutModalOpened">
      <p>You have logged in for 10 seconds. Do you want to logout?</p>
      <button @click="$emit('logout')">Yes</button>
      <button @click="restartLogoutPromptTimeout">No</button>
    </LogoutModal>
  </main>
</template>

<script>
import MarioKart from './MarioKart.vue';
import LogoutModal from './LogoutModal.vue';
import lorem from '../services/lorem';
import recursiveRequestAnimationFrame from '../services/recursiveRequestAnimationFrame';

const MARIO_KART_MAX_PX_PER_MS = 0.5;
const LOGOUT_PROMPT_TIMEOUT_MS = 10000;

export default {
  components: { MarioKart, LogoutModal },

  mounted() {
    // 1
    this.cancelAnimationFrame = recursiveRequestAnimationFrame(this.marioKartTick);

    // 2
    const { loremTrigger, loremsContainer } = this.$refs;

    this.observer = new window.IntersectionObserver(
      ([{ isIntersecting }]) => isIntersecting && this.fetchMoreLorem(),
      { root: loremsContainer },
    );
    this.observer.observe(loremTrigger);

    // 3
    this.restartLogoutPromptTimeout();
  },

  beforeDestroy() {
    // 1
    this.cancelAnimationFrame();

    // 2
    this.observer.disconnect();

    // 3
    window.clearInterval(this.autoLogoutTimeoutId);
  },

  data: () => ({
    // 1
    marioKartXLastUpdatedTime: window.performance.now(),
    marioKartY: 0,
    marioKartSpeed: 10,

    // 2
    paragraphs: [],

    //3
    logoutModalOpened: false,
  }),

  methods: {
    // 1
    marioKartTick() {
      const msElapsed = window.performance.now() - this.marioKartXLastUpdatedTime;
      const pxPerMs = (this.marioKartSpeed * MARIO_KART_MAX_PX_PER_MS) / 100;
      this.marioKartY = (this.marioKartY + pxPerMs * msElapsed) % 100;
      this.marioKartXLastUpdatedTime = window.performance.now();
    },

    // 2
    async fetchMoreLorem() {
      this.paragraphs = this.paragraphs.concat(await lorem.ipsum());
    },

    // 3
    restartLogoutPromptTimeout() {
      this.logoutModalOpened = false;
      this.autoLogoutTimeoutId = window.setTimeout(
        () => (this.logoutModalOpened = true),
        LOGOUT_PROMPT_TIMEOUT_MS,
      );
    },
  },
};
</script>

<style scoped>
fieldset {
  margin: 1rem 0;
}

.infinite-lorem {
  max-height: 50vh;
  overflow: auto;
  padding: 1rem;
  border: 1px black;
  border-style: dotted solid double dashed;
  border-radius: 1rem 0 0 8rem;
}
</style>
