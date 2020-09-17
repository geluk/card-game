<template>
  <div
    id="table"
    class="drop-zone"
    :class="{highlight: highlight}"
    @dragover.prevent
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop">
    <p>Completed sets will go here.</p>
    <div class="completed-sets">
      <div class="completed-set" v-for="set in typedCompletedSets" :key="set.setId">
        <Card v-for="card in set.cards" :key="card.uniqueId" :card="card" />
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
  computed: {
    typedCompletedSets(): CardSet[] {
      //
      return this.completedSets as CardSet[];
    },
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
      console.log('dropped on table');
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
  border: 1px solid green;

}

.assembly-area {
  min-height: 10vh;
}

.assembly-area, .completed-sets {
  display: flex;
  justify-content: center;
}

.completed-set {
  height: 29vh;
}

.completed-set .card {
  margin-bottom: -17vh;
}
</style>
