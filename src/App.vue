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
    <GameBar
      :score="totalScore + game.score"
      :shufflesRemaining="game.shufflesRemaining"
      @shuffle-click="onShuffleClick"
      @new-game-click="onNewGameClick" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hand from './components/Hand.vue';
import Stack from './components/Stack.vue';
import Discard from './components/Discard.vue';
import Table from './components/Table.vue';
import GameBar from './components/GameBar.vue';
import Game from './game/Game';
import { Card } from './game/Card';
import NotifyType from './game/NotifyType';
import GameOutcome from './game/GameOutcome';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      game: new Game(),
      totalScore: 0,
    };
  },
  mounted() {
    this.startNewGame();
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
    onShuffleClick() {
      this.game.shuffle();
    },
    onNewGameClick() {
      this.startNewGame();
    },
    startNewGame() {
      this.totalScore += this.game.score;
      this.game = new Game();
      this.game.onMessage.observe(((evt) => {
        const [type, msg] = evt;
        switch (type) {
          case NotifyType.Info:
            this.$toasted.show(msg, { className: 'info' });
            break;
          case NotifyType.Error:
            this.$toasted.show(msg, { className: 'error' });
            break;
          default:
            break;
        }
      }));
      this.game.onFinished.observe((outcome) => {
        switch (outcome) {
          case GameOutcome.Win:
            this.$toasted.show('You win!');
            break;
          case GameOutcome.NoMoreMoves:
            this.$toasted.show('No more moves!');
            break;
          case GameOutcome.HandClear:
            this.$toasted.show('Game cleared!');
            break;
          default:
            break;
        }
      });
    },
  },
  components: {
    Hand,
    Stack,
    Discard,
    Table,
    GameBar,
  },
});
</script>

<style>
html {
  font-size: min(2vh, 2vw);
  user-select: none;
}
#app, .toasted .primary, .toasted.toasted-primary {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  text-align: center;
  color: #2c3e50;
}
.toasted .primary, .toasted.toasted-primary {
  font-size: inherit;
  padding: 0.5rem 1.5rem;
  min-height: initial;
}
#stacks-container {
  display: flex;
  justify-content: center;
}
.container {
  padding: 0 1rem;
}
.highlight{
  background-color: #ddd;
}
</style>
