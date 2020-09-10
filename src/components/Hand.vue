<template>
  <div id="hand">
    <h2>Your hand</h2>
    <div id="hand-cards">
      <Card v-for="card in cards" v-bind:key="card.uniqueId" v-bind:card="card" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from './Card.vue';
import { Card as GameCard } from '../game/card';

export default Vue.extend({
  name: 'Hand',
  props: {
    cards: { type: Array },
  },
  components: {
    Card,
  },
});
</script>

<style scoped>
#hand {
  border: 1px solid grey;
}
#hand-cards {
  display: flex;
  justify-content: center;
}
</style>
