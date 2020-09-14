<template>
  <div
    id="discard"
    :class="{highlight: highlight}"
    class="drop-zone"
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop">
      <p>Drag cards here to discard them.</p>
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
      highlight: false,
    };
  },
  methods: {
    onDragEnter(evt: DragEvent, rem: any) {
      this.highlight = true;
      console.log('entered discard dropping area', evt, rem);
    },
    onDragLeave(evt: Event) {
      this.highlight = false;
      console.log('left discard dropping area', evt);
    },
    onDrop(evt: DragEvent) {
      if (!evt.dataTransfer) {
        throw new ApplicationError('Drag event has no dataTransfer object!');
      }
      const uniqueId = evt.dataTransfer.getData('uniqueId');
      console.log('dropped ', uniqueId);
      this.$emit('dropped-card', evt, uniqueId);
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
