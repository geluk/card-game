<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <!-- <HelloWorld /> -->
    <div id="stacks-container">
      <Stack class="container" @click-card="onStackCardClick" :cards="game.stack" />
      <Discard class="container" @dropped-card="onDiscardCardDrop" :cards="game.discard" />
    </div>
    <Hand @dropped-card="onHandCardDrop" :cards="game.hand" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Hand from './components/Hand.vue';
import Stack from './components/Stack.vue';
import Discard from './components/Discard.vue';
import Game from './game/Game';
import { Card } from './game/Card';
import ApplicationError from './common/ApplicationError';

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
    onHandCardDrop(evt: Event, uniqueId: string) {
      const card = this.takeCard(uniqueId);
      if (card === null) {
        throw new ApplicationError(`Failed to find card with ID ${uniqueId}`);
      }
      this.game.hand.push(card);
    },
    onDiscardCardDrop(evt: Event, uniqueId: string) {
      const card = this.takeCard(uniqueId);
      if (card === null) {
        throw new ApplicationError(`Failed to find card with ID ${uniqueId}`);
      }
      this.game.discard.push(card);
    },
    takeCard(uniqueId: string): Card | null {
      const removeIfExists = (arr: Array<Card>, id: string): Card | null => {
        const idx = arr.findIndex((c) => c.uniqueId === id);
        if (idx >= 0) {
          return arr.splice(idx, 1)[0];
        }
        return null;
      };

      // eslint-disable-next-line
      for (const arr of [this.game.stack, this.game.hand, this.game.discard]) {
        const card = removeIfExists(arr, uniqueId);
        if (card !== null) {
          return card;
        }
      }
      return null;
    },
  },
  components: {
    // HelloWorld,
    Hand,
    Stack,
    Discard,
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
#stacks-container {
  display: flex;
  justify-content: center;
}
.container {
  padding: 0vh 2vh;
}
</style>
