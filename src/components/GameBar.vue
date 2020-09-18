<template>
  <div id="game-bar">
    <div class="help-button">
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
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    score: Number,
    shufflesRemaining: Number,
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
</style>
