<template>
  <div
    id="hand"
    :class="{highlight: highlight}"
    @dragover.prevent
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop">
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
  data() {
    return {
      highlight: false,
    };
  },
  methods: {
    onDragEnter(evt: Event, rem: any) {
      this.highlight = true;
      console.log('entered dropping area', evt, rem);
    },
    onDragLeave(evt: Event) {
      this.highlight = false;
      console.log('left dropping area', evt);
    },
    onDrop(evt: DragEvent) {
      console.log('dropped ', evt.dataTransfer?.getData('uniqueId'));
      this.highlight = false;
    },
    accepts(evt: Event) {
      // no
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
#hand.highlight{
  background-color: #ddd;
}
#hand-cards {
  display: flex;
  justify-content: center;
}
</style>
