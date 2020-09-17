<template>
  <div id="app">
    <Table
      class="container"
      @dropped-card="onTableCardDrop"
      :assemblyArea="game.assemblyArea"
      :completedSets="game.table" />
    <div id="stacks-container">
      <Stack class="container" @click-card="onStackCardClick" :cards="game.stack" />
      <Hand @dropped-card="onHandCardDrop" @click-card="onHandCardClick" :cards="game.hand" />
      <Discard class="container" @dropped-card="onDiscardCardDrop" :cards="game.discard" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hand from './components/Hand.vue';
import Stack from './components/Stack.vue';
import Discard from './components/Discard.vue';
import Table from './components/Table.vue';
import Game from './game/Game';
import { Card } from './game/Card';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      game: new Game(),
    };
  },
  methods: {
    onStackCardClick() {
      this.game.moveToHand();
    },
    onHandCardClick(evt: Event, card: Card) {
      this.game.moveToAssemblyArea(card);
    },
    onHandCardDrop(evt: Event, cardId: string, recipient: Card | null) {
      const card = this.game.findCard(cardId);
      this.game.positionCardInHand(card, recipient);
    },
    onDiscardCardDrop(evt: Event, cardId: string) {
      const card = this.game.findCard(cardId);
      this.game.moveToDiscard(card);
    },
    onTableCardDrop(evt: Event, cardId: string) {
      const card = this.game.findCard(cardId);
      this.game.moveToAssemblyArea(card);
    },
  },
  components: {
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
