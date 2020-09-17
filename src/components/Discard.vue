<template>
  <div
    id="discard"
    :class="{highlight: highlight}"
    class="drop-zone"
    @dragover.prevent
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop">
      <div><p>Drag cards here to discard them.</p></div>
      <ReversedCard v-for="card in cards" v-bind:key="card.uniqueId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card as GameCard } from '@/game/Card';
import ApplicationError from '@/common/ApplicationError';
import ReversedCard from './ReversedCard.vue';

export default Vue.extend({
  name: 'Discard',
  props: {
    cards: { type: Array },
  },
  data() {
    return {
      highlight: 0,
    };
  },
  methods: {
    onDragEnter(evt: DragEvent) {
      if (!this.isValidDrop(evt)) return;
      this.highlight += 1;
      console.log('entered discard dropping area', evt);
    },
    onDragLeave(evt: DragEvent) {
      if (!this.isValidDrop(evt)) return;
      this.highlight -= 1;
      console.log('left discard dropping area', evt);
    },
    onDrop(evt: DragEvent) {
      if (!this.isValidDrop(evt)) return;
      console.log('dropped on discard');
      this.highlight = 0;

      const uniqueId = evt.dataTransfer!.getData('uniqueId');
      console.log('dropped ', uniqueId);
      this.$emit('dropped-card', evt, uniqueId);
    },
    isValidDrop(evt: DragEvent) {
      return evt.dataTransfer && evt.dataTransfer.getData('uniqueId');
    },
  },
  computed: {
  },
  components: {
    ReversedCard,
  },
});

</script>
<style scoped>
.card {
  margin-bottom: -22vh;
}
#discard {
  height: 30vh;
  border: 1px solid red;
}
</style>
