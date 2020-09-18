<template>
  <div
    id="discard"
    :class="{highlight: highlight}"
    class="drop-zone"
    @dragover.prevent
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop">
      <div><p>Drag cards here to discard them.</p></div>
      <ReversedCard v-for="card in cards" v-bind:key="card.uniqueId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReversedCard from './ReversedCard.vue';

export default Vue.extend({
  name: 'Discard',
  props: {
    cards: Array,
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
    },
    onDragLeave(evt: DragEvent) {
      if (!this.isValidDrop(evt)) return;
      this.highlight -= 1;
    },
    onDrop(evt: DragEvent) {
      if (!this.isValidDrop(evt)) return;
      this.highlight = 0;

      const uniqueId = evt.dataTransfer!.getData('uniqueId');
      this.$emit('dropped-card', evt, uniqueId);
    },
    isValidDrop(evt: DragEvent) {
      return evt.dataTransfer && evt.dataTransfer.getData('uniqueId');
    },
  },
  components: {
    ReversedCard,
  },
});

</script>
<style scoped>
.card {
  margin-bottom: -9.75rem;
}
#discard {
  border: 1px solid grey;
}
</style>
