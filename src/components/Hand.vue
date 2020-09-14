<template>
  <div
    id="hand"
    :class="{highlight: highlight > 0}"
    class="drop-zone"
    @dragover.prevent
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop">
    <div>
      <h2>Your hand</h2>
    </div>
    <div id="hand-cards">
    <div class="card-container" v-for="card in cards" :key="card.uniqueId">
      <Card
        :card="card"
        @click="onClick"
        @dragenter="onCardDragEnter"
        @dragleave="onCardDragLeave"
        @drop="onCardDrop" />
      <ReversedCard v-if="highlightedCardId === card.uniqueId" />
    </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card as GameCard } from '@/game/Card';
import ApplicationError from '@/common/ApplicationError';
import Card from './Card.vue';
import ReversedCard from './ReversedCard.vue';

export default Vue.extend({
  name: 'Hand',
  props: {
    cards: { type: Array },
  },
  data() {
    return {
      highlight: 0,
      highlightedCardId: '',
    };
  },
  methods: {
    onDragEnter(evt: DragEvent, rem: any) {
      this.highlight += 1;
      // console.log(`entered hand dropping area (${this.highlight})`, evt, rem);
    },
    onDragLeave(evt: Event) {
      this.highlight -= 1;
      // console.log(`left hand dropping area (${this.highlight})`, evt);
    },
    onDrop(evt: DragEvent) {
      this.highlight = 0;
      if (!evt.dataTransfer) {
        throw new ApplicationError('Drag event has no dataTransfer object!');
      }
      const uniqueId = evt.dataTransfer.getData('uniqueId');
      console.log('dropped ', uniqueId);
      this.$emit('dropped-card', evt, uniqueId);
    },
    onCardDragEnter(evt: DragEvent, card: GameCard) {
      console.log(`entered card ${card.uniqueId} drop zone`, evt);
      this.highlightedCardId = card.uniqueId;
      evt.stopPropagation();
    },
    onCardDragLeave(evt: DragEvent, card: GameCard) {
      console.log(`left card ${card.uniqueId} drop zone`, evt);
      // The 'enter' event for an adjacent card may fire before the current card's 'leave' event,
      // therefore we should only remove the highlight if the highlighted ID hasn't yet changed.
      if (this.highlightedCardId === card.uniqueId) {
        this.highlightedCardId = '';
      }
      evt.stopPropagation();
    },
    onCardDrop(evt: DragEvent, card: GameCard) {
      console.log(`dropped ${evt.dataTransfer.getData('uniqueId')} on ${card.uniqueId}`, evt);
      this.highlightedCardId = '';
      evt.stopPropagation();
    },
    onClick(evt: Event, card: GameCard) {
      console.log(evt.type, card.uniqueId, evt);
    },
  },
  components: {
    Card,
    ReversedCard,
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
.cards-container {
  display: flex;
  justify-content: center;
}
</style>
