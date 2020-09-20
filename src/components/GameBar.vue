<template>
<div>
    <div id="game-bar">
    <div class="help-button" @click="toggleHelp">
      &#x2754;
    </div>
    <div id="game-options">
      <div>
        Score: {{ score }}
      </div>
      <div>
        Shuffles remaining: {{ shufflesRemaining }}
      </div>
      <div>
        <button v-text="'shuffle'" @click="$emit('shuffle-click')"></button>
      </div>
      <div>
        <button v-text="'new game'" @click="$emit('new-game-click')"></button>
      </div>
    </div>
  </div>
  <div id="help-overlay" :class="{ hidden: hideHelp }">
    <div class="text-area">
      <h1>Help</h1>
      <h2>Gameplay</h2>
      <p>
        The goal in this game is to create as many sets of four as possible,
        containing one card of each suit, all of the same value.
      </p>
      <p>
        You can collect cards in your hand, from which you can build your sets.
        As long as your hand contains less than seven cards,
        you may draw new cards from the stack on the left.
      </p>
      <p>
        Move cards to the table at the top of the screen to assemble your sets.
        As soon as the table contains four cards of the same value, a set is created,
        and the table is cleared.
      </p>
      <p>
        The table may only contain cards of the same value.
        Temporarily placing cards on the table may help reduce the number of cards in your hand,
        allowing you to draw new cards to finish your set.
      </p>
      <button @click="closeHelp">Close</button>
    </div>
  </div>
</div>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      hideHelp: false,
    };
  },
  props: {
    score: Number,
    shufflesRemaining: Number,
  },
  methods: {
    toggleHelp() {
      this.hideHelp = !this.hideHelp;
    },
    closeHelp() {
      this.hideHelp = true;
    },
  },
});
</script>

<style scoped>
button {
  background-color: #bbb;
  color: #2c3e50;
  border: none;
  font-family: inherit;
  font-size: inherit;
  padding: 0.2rem 0.3rem;
}
#game-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #ddd;
  padding: 0.5rem;
}
#game-options {
  display: flex;
  justify-content: center;
  align-items: center;
}
#game-options > div {
  padding: 0 0.5rem;
}
.help-button {
  position: absolute;
  left: 0.5rem;
  bottom: 0.5rem;
}
.hidden {
  display: none;
}
#help-overlay {
  background-color: #444444dd;
  color: #eee;
  position: absolute;
  left: 20vw;
  right: 20vw;
  top: 8rem;
  padding: 0 1rem 2rem 1rem;
  border-radius: 0.25rem;
}
.text-area {
  position: relative;
  height: 100%;
}
.text-area button {
  margin-top: 2rem;
}
</style>
