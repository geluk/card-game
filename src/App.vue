<template>
  <div id="app">
    <Table
      class="container"
      @dropped-card="onTableCardDrop"
      :assemblyArea="game.assemblyArea"
      :completedSets="game.table" />
    <div id="stacks-container">
      <Stack class="container" @click-card="onStackCardClick" :cards="game.stack" />
      <Hand @dropped-card="onHandCardDrop" :cards="game.hand" />
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
    onHandCardDrop(evt: Event, cardId: string, recipient: Card | null) {
      this.game.positionCardInHand(cardId, recipient);
    },
    onDiscardCardDrop(evt: Event, uniqueId: string) {
      this.game.moveToDiscard(uniqueId);
    },
    onTableCardDrop(evt: Event, uniqueId: string) {
      this.game.moveToAssemblyArea(uniqueId);
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
