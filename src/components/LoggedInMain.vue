<template>
  <main>
    <p>Hi Vue.js London. Welcome to my AMAZING WEBSITE.</p>

    <!-- 1. mario kart -->
    <RequestAnimationFrame @frame="marioKartTick"></RequestAnimationFrame>
    <fieldset>
      <legend>Control the speed of the mario</legend>
      <input type="range" min="0" max="100" v-model="marioKartSpeed">
    </fieldset>
    <MarioKart :y="marioKartY"></MarioKart>

    <!-- 2. lorem ipsum paragraphs -->
    <article class="infinite-lorem" ref="loremsContainer">
      <h2>KEEP SCROLLIN&rsquo;</h2>
      <p v-for="(paragraph, i) of paragraphs" :key="i">{{ paragraph }}</p>
      <div ref="loremTrigger">Loading...</div>
    </article>
    <IntersectionObserver :rootRef="() => $refs.loremsContainer" :targetRef="() => $refs.loremTrigger" @intersect-enter="fetchMoreLorem"></IntersectionObserver>

    <!-- 3. logout modal -->
    <LogoutModal :opened="logoutModalOpened">
      <p>You have logged in for 10 seconds. Do you want to logout?</p>
      <button @click="$emit('logout')">Yes</button>
      <button @click="logoutModalOpened = false">No</button>
    </LogoutModal>
    <Timeout :delay="logoutTimeoutDelay" @timeout="logoutModalOpened = true" v-if="!logoutModalOpened"></Timeout>
  </main>
</template>

<script>
import MarioKart from './MarioKart.vue';
import LogoutModal from './LogoutModal.vue';
import RequestAnimationFrame from './renderless/RequestAnimationFrame';
import IntersectionObserver from './renderless/IntersectionObserver';
import Timeout from './renderless/Timeout';
import lorem from '../services/lorem';

const MARIO_KART_MAX_PX_PER_MS = 0.5;
const LOGOUT_PROMPT_TIMEOUT_MS = 10000;

export default {
  components: {
    MarioKart,
    LogoutModal,
    RequestAnimationFrame,
    IntersectionObserver,
    Timeout,
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
    logoutTimeoutDelay: LOGOUT_PROMPT_TIMEOUT_MS,
  }),

  methods: {
    // 1
    marioKartTick(msElapsed) {
      const pxPerMs = (this.marioKartSpeed * MARIO_KART_MAX_PX_PER_MS) / 100;
      this.marioKartY = (this.marioKartY + pxPerMs * msElapsed) % 100;
      this.marioKartXLastUpdatedTime = window.performance.now();
    },

    // 2
    async fetchMoreLorem() {
      this.paragraphs = this.paragraphs.concat(await lorem.ipsum());
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
