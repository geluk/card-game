<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <!-- <HelloWorld /> -->
    <Stack @click-card="onStackCardClick" :cards="game.stack" />
    <Hand :cards="game.hand" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Hand from './components/Hand.vue';
import Stack from './components/Stack.vue';
import Game from './game/game';
import { Card } from './game/card';

export default Vue.extend({
  name: 'App',
  props: {
    message: String,
  },
  data() {
    return {
      game: new Game(),
    };
  },
  methods: {
    onStackCardClick(evt: Event, card: Card) {
      if (this.game.stack) {
        const removedCard = this.game.stack.splice(0, 1)[0];
        this.game.hand.push(removedCard);
      }
    },
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
