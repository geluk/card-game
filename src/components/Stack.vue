<template>
  <div id="stack">
      <p >{{cards.length}} cards on stack</p>
      <ReversedCard v-if="cards.length > 1" />
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
//        @click="$emit('remove-card', $event)"
import Vue from 'vue';
import { Card as GameCard } from '@/game/card';
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
  position: absolute;
}
#stack {
  height: 30vh;
  border: 1px solid red;
}
</style>
