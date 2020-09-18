<template>
  <div id="stack">
      <p>Drag a card to add it to your hand.</p>
      <div class="stack-cards">
        <ReversedCard v-for="card in cards.slice(1)" v-bind:key="card.uniqueId" />
        <Card
          :card="cards[0]"
          @click="onClick"
          v-if="cards.length > 0" />
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card as GameCard } from '@/game/Card';
import Card from './Card.vue';
import ReversedCard from './ReversedCard.vue';

export default Vue.extend({
  name: 'Stack',
  props: {
    cards: Array,
  },
  methods: {
    onClick(evt: Event, card: GameCard) {
      console.log(evt.type, card.uniqueId, evt);
      this.$emit('click-card', evt, card);
    },
  },
  components: {
    Card,
    ReversedCard,
  },
});

</script>
<style scoped>
.card {
  margin-bottom: -9.75rem;
}
#stack {
  border: 1px solid grey;
}
.stack-cards .card:last-child {
  margin-bottom: 0;
}
</style>
