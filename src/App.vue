<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <!-- <HelloWorld /> -->
    <Stack :cards="game.stack" />
    <Hand :cards="game.hand" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Hand from './components/Hand.vue';
import Stack from './components/Stack.vue';
import Game from './game/game';

export default Vue.extend({
  name: 'App',
  props: {
    message: String,
    game: Game,
  },
  components: {
    // HelloWorld,
    Hand,
    Stack,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
