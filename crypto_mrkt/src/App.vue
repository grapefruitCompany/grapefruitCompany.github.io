<template>
  <div id="app">
    <Crypto />
  </div>
</template>

<script>
import Crypto from "./components/Crypto.vue";

export default {
  name: "app",
  components: {
    Crypto
  }
};
</script>

<style lang="scss">
@import "scss/main.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 50px 0;
}
</style>
