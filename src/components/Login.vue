<template>
  <form @submit="$emit('login')" novalidate>
    <input type="email" placeholder="Your email" />
    <input type="password" placeholder="Your p@55w0rd" />
    <input type="submit" />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

form > *:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
