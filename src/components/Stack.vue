<template>
  <div id="stack">
      <p>{{cards.length}} cards on stack</p>
      <ReversedCard v-if="cards.length > 1" />
      <Card v-if="cards.length > 0" v-bind:card="cards[0]" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from './Card.vue';
import ReversedCard from './ReversedCard.vue';
import { Card as GameCard } from '../game/card';

export default Vue.extend({
  name: 'Stack',
  props: {
    cards: { type: Array },
  },
  computed: {
  },
  components: {
    Card,
    ReversedCard,
  },
});

</script>
<style scoped>
.card {
  position: absolute;
}
#stack {
  height: 20vh;
  border: 1px solid red;
}
</style>
