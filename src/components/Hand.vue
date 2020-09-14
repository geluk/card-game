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
    onDragEnter(evt: DragEvent) {
      // 'enter' and 'leave' events on child elements will bubble up to this handler,
      // so we can't just use a boolean here.
      this.highlight += 1;
    },
    onDragLeave(evt: DragEvent) {
      this.highlight -= 1;
    },
    onDrop(evt: DragEvent) {
      this.highlight = 0;
      if (!evt.dataTransfer) {
        throw new ApplicationError('Drop event has no dataTransfer object!');
      }
      const uniqueId = evt.dataTransfer.getData('uniqueId');
      console.log('dropped ', uniqueId);
      this.$emit('dropped-card', evt, uniqueId, null);
    },
    onCardDragEnter(evt: DragEvent, card: GameCard) {
      console.log(`entered card ${card.uniqueId} drop zone`, evt);
      this.highlightedCardId = card.uniqueId;
      // Stopping propagation ensures the hand does not receive this event,
      // so to the hand it will look like dragged card just left it.
      // This ensures the hand does not remain highlighted when dragging over a card in the hand.
      evt.stopPropagation();
    },
    onCardDragLeave(evt: DragEvent, card: GameCard) {
      console.log(`left card ${card.uniqueId} drop zone`, evt);
      // The 'enter' event for an adjacent card may fire before the current card's 'leave' event,
      // therefore we should only remove the highlight if the highlighted ID hasn't yet changed.
      if (this.highlightedCardId === card.uniqueId) {
        this.highlightedCardId = '';
      }
      // Since we stop 'enter' event propagation, we should also stop 'leave' events.
      evt.stopPropagation();
    },
    onCardDrop(evt: DragEvent, card: GameCard) {
      this.highlight = 0;
      if (!evt.dataTransfer) {
        throw new ApplicationError('Drop event has no dataTransfer object!');
      }
      const uniqueId = evt.dataTransfer.getData('uniqueId');
      console.log(`dropped ${uniqueId} on ${card.uniqueId}`, evt);
      this.highlightedCardId = '';
      evt.stopPropagation();
      this.$emit('dropped-card', evt, uniqueId, card.uniqueId);
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
