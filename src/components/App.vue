<template>
  <div class="backdrop">
    <div class="container frontdrop">
      <Header></Header>

      <Login v-if="!isLoggedIn" @login="() => (isLoggedIn = true)"></Login>
      <LoggedInMain v-else @logout="isLoggedIn = false"></LoggedInMain>

      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import Login from './Login.vue';
import LoggedInMain from './LoggedInMain.vue';
import Footer from './Footer.vue';

export default {
  name: 'App',

  components: {
    Header,
    LoggedInMain,
    Login,
    Footer,
  },

  data: () => ({
    isLoggedIn: false,
  }),
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.frontdrop {
  background: white;
  min-height: 100vh;
}

.backdrop {
  background: #f5ffc0;
  min-height: 100vh;
}
</style>

<style>
html {
  font-family: 'ZCOOL KuaiLe', cursive;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

input:not([type='range']),
button,
textarea {
  font-family: inherit;
  font-size: inherit;
  background: #c0fff1;
  padding: 1rem;
  border: 1px dashed black;
}

input[type='submit'],
button {
  background: white;
  border-style: dotted solid double dashed;
}
</style>
