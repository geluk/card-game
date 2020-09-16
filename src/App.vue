<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <!-- <HelloWorld /> -->
    <Table />
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
import Table from './components/Table.vue';
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
      const removedCard = this.game.stack.shift();
      if (removedCard) {
        this.game.hand.push(removedCard);
      }
    },
    onHandCardDrop(evt: Event, cardId: string, recipient: Card | null) {
      const card = this.takeCard(cardId);
      if (recipient === null) {
        this.game.hand.push(card);
      } else {
        const index = this.game.hand.indexOf(recipient);
        this.game.hand.splice(index + 1, 0, card);
      }
    },
    onDiscardCardDrop(evt: Event, uniqueId: string) {
      console.log('dropped on discard');
      const card = this.takeCard(uniqueId);
      this.game.discard.push(card);
    },
    takeCard(uniqueId: string): Card {
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
      throw new ApplicationError(`Failed to find card with ID ${uniqueId}`);
    },
  },
  components: {
    // HelloWorld,
    Hand,
    Stack,
    Discard,
    Table,
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
.highlight{
  background-color: #ddd;
}
</style>
