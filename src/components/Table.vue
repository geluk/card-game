<template>
  <div
    id="table"
    class="drop-zone"
    :class="{highlight: highlight}"
    @dragover.prevent
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop">
    <div class="completed-sets">
      <div class="completed-set" v-for="set in completedSets" :key="set.setId">
        <Card v-for="card in set.cards" :key="card.uniqueId" :card="card" :inactive="true" />
      </div>
    </div>
    <p>Assemble a new set by dragging cards of the same set here.</p>
    <div class="assembly-area container">
      <Card v-for="card in assemblyArea.cards" :key="card.uniqueId" :card="card" />
    </div>
  </div>
</template>

<script lang="ts">
import CardSet from '@/game/CardSet';
import Vue from 'vue';
import Card from './Card.vue';

export default Vue.extend({
  name: 'Table',
  props: {
    assemblyArea: { type: CardSet },
    completedSets: { type: Array },
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
    Card,
  },
});

</script>

<style scoped>
#table {
  border: 1px solid grey;
  height: 28rem;
}

.assembly-area {
  min-height: 10vh;
}

.assembly-area, .completed-sets {
  display: flex;
  justify-content: center;
}

.completed-set .card {
  margin-bottom: -9rem;
}
.completed-set .card:last-child {
margin-bottom: 0;
}
</style>
