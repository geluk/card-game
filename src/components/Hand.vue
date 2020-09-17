<template>
  <div
    id="hand"
    :class="{highlight: highlight > 0}"
    @dragover.prevent
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop">
    <div>
      <h2>Your hand</h2>
      <p>Drag cards to arrange them in sets of four, then click a set to move it to the table.</p>
    </div>
    <div id="hand-cards">
    <div class="card-container" v-for="card in cards" :key="card.uniqueId">
      <Card
        :card="card"
        :highlight="shouldHighlight(card)"
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
import Card from './Card.vue';

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
      if (!this.isValidDrop(evt)) return;
      // 'enter' and 'leave' events on child elements will bubble up to this handler,
      // so we can't just use a boolean here, or the drop zone will keep flashing.
      this.highlight += 1;
    },
    onDragLeave(evt: DragEvent) {
      if (!this.isValidDrop(evt)) return;
      this.highlight -= 1;
    },
    onDrop(evt: DragEvent) {
      if (!this.isValidDrop(evt)) return;
      this.highlight = 0;
      this.highlightedCardId = '';
      const uniqueId = this.getUniqueId(evt);
      this.$emit('dropped-card', evt, uniqueId, null);
    },
    onCardDragEnter(evt: DragEvent, recipient: GameCard) {
      if (!this.isValidDrop(evt)) return;
      this.highlightedCardId = recipient.uniqueId;
      // Stopping propagation ensures the hand does not receive this event,
      // so to the hand it will look like dragged card just left it.
      // This ensures the hand does not remain highlighted when dragging over a card in the hand.
      evt.stopPropagation();
    },
    onCardDragLeave(evt: DragEvent, recipient: GameCard) {
      if (!this.isValidDrop(evt)) return;
      // The 'enter' event for an adjacent card may fire before the current card's 'leave' event,
      // therefore we should only remove the highlight if the highlighted ID hasn't yet changed.
      if (this.highlightedCardId === recipient.uniqueId) {
        this.highlightedCardId = '';
      }
      // Since we stop 'enter' event propagation, we should also stop 'leave' events.
      evt.stopPropagation();
    },
    onCardDrop(evt: DragEvent, recipient: GameCard) {
      if (!this.isValidDrop(evt)) return;
      this.highlight = 0;
      this.highlightedCardId = '';
      evt.stopPropagation();
      const uniqueId = this.getUniqueId(evt);
      this.$emit('dropped-card', evt, uniqueId, recipient);
    },
    onClick(evt: Event, card: GameCard) {
      this.$emit('click-card', evt, card);
    },
    getUniqueId(evt: DragEvent): string {
      return evt.dataTransfer!.getData('uniqueId');
    },
    shouldHighlight(card: GameCard): boolean {
      return this.highlightedCardId === card.uniqueId;
    },
    isValidDrop(evt: DragEvent) {
      return evt.dataTransfer && evt.dataTransfer.getData('uniqueId');
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
  width: 80%;
  margin-left: 0;
  margin-right: auto;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10px, max-content));
}
</style>
