<template>
  <div id="stack">
      <p>Drag a card to add it to your hand.</p>
      <ReversedCard v-for="card in cards.slice(1)" v-bind:key="card.uniqueId" />
      <Card
        :card="cards[0]"
        @click="onClick"
        @drop="report"
        @dragstart="report"
        @dragend="report"
        v-if="cards.length > 0" />
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
    cards: { type: Array },
  },
  methods: {
    onClick(evt: Event, card: GameCard) {
      this.$emit('click-card', evt, card);
    },
    report(evt: Event, card: GameCard) {
      console.log(evt.type, card.uniqueId, evt);
    },
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
  margin-bottom: -22vh;
}
#stack {
  height: 30vh;
  border: 1px solid blue;
}
</style>
