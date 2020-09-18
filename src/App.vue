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
    <div id="game-bar">
      <div>
        Score: {{ totalScore + game.score }}
      </div>
      <div>
        Shuffles remaining: {{ game.shufflesRemaining }}
      </div>
      <div>
        <button v-text="'shuffle'" @click="onShuffleClick"></button>
      </div>
      <div>
        <button v-text="'new game'" @click="onNewGameClick"></button>
      </div>
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
            this.$toasted.show(msg);
            console.log(`info: ${msg}`);
            break;
          case NotifyType.Error:
            this.$toasted.show(msg);
            console.log(`error: ${msg}`);
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
  },
});
</script>

<style>
html {
  font-size: min(2vh, 2vw);
  user-select: none;
}
#app, .toast-notification {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  background-color: #bbb;
  color: #2c3e50;
  border: none;
  font-family: inherit;
  font-size: inherit;
  padding: 0.2rem 0.3rem;
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
#hand {
  flex-grow: 2;
}
.container {
  padding: 0 1rem;
}
.highlight{
  background-color: #ddd;
}
#game-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #ddd;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
#game-bar > div {
  padding: 0 0.5rem;
}
</style>
