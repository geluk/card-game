<template>
  <div
    id="hand"
    :class="{highlight: highlight > 0}"
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
        :highlight="shouldDropHere(card)"
        @click="onClick"
        @dragenter="onCardDragEnter"
        @dragleave="onCardDragLeave"
        @drop="onCardDrop" />
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
      // so we can't just use a boolean here, or the drop zone will keep flashing.
      this.highlight += 1;
      const uniqueId = this.getUniqueId(evt);
      console.log(`hand enter (${this.highlight}): ${uniqueId}`, evt);
    },
    onDragLeave(evt: DragEvent) {
      this.highlight -= 1;
      const uniqueId = this.getUniqueId(evt);
      console.log(`hand leave (${this.highlight}): ${uniqueId}`);
    },
    onDrop(evt: DragEvent) {
      this.highlight = 0;
      this.highlightedCardId = '';
      const uniqueId = this.getUniqueId(evt);
      console.log('dropped ', uniqueId);
      this.$emit('dropped-card', evt, uniqueId, null);
    },
    onCardDragEnter(evt: DragEvent, recipient: GameCard) {
      console.log(`entered card ${recipient.uniqueId} drop zone`, evt);
      this.highlightedCardId = recipient.uniqueId;
      // Stopping propagation ensures the hand does not receive this event,
      // so to the hand it will look like dragged card just left it.
      // This ensures the hand does not remain highlighted when dragging over a card in the hand.
      evt.stopPropagation();
    },
    onCardDragLeave(evt: DragEvent, recipient: GameCard) {
      console.log(`left card ${recipient.uniqueId} drop zone`, evt);
      // The 'enter' event for an adjacent card may fire before the current card's 'leave' event,
      // therefore we should only remove the highlight if the highlighted ID hasn't yet changed.
      if (this.highlightedCardId === recipient.uniqueId) {
        this.highlightedCardId = '';
      }
      // Since we stop 'enter' event propagation, we should also stop 'leave' events.
      evt.stopPropagation();
    },
    onCardDrop(evt: DragEvent, recipient: GameCard) {
      this.highlight = 0;
      this.highlightedCardId = '';
      const uniqueId = this.getUniqueId(evt);
      console.log(`dropped ${uniqueId} on ${recipient.uniqueId}`, evt);
      evt.stopPropagation();
      this.$emit('dropped-card', evt, uniqueId, recipient);
    },
    onClick(evt: Event, card: GameCard) {
      console.log(evt.type, card.uniqueId, evt);
    },
    getUniqueId(evt: DragEvent): string {
      if (!evt.dataTransfer) {
        throw new ApplicationError('Drop event has no dataTransfer object!');
      }
      return evt.dataTransfer.getData('uniqueId');
    },
    shouldDropHere(recipient: GameCard): boolean {
      /* eslint-disable */
      if (this.highlightedCardId === '') {
        return false;
        const lastCard = this.cards[this.cards.length - 1] as GameCard;
        return this.highlight >= 1 && recipient.cardId === lastCard.cardId;
      }
      if (this.highlightedCardId === recipient.uniqueId) {
        return true;
      }
      return false;
    },
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
.card-container {
  display: flex;
  justify-content: center;
}
.indicator {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
}
.indicator::before {
  content: 'V';
}
</style>
