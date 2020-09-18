<template>
  <div
    class="card obverse draggable drop-zone"
    :class="{ highlight: highlight, inactive: inactive }"
    draggable
    @dragover.prevent
    @dragenter="$emit('dragenter', $event, card)"
    @dragleave="$emit('dragleave', $event, card)"
    @click="$emit('click', $event, card)"
    @drag="$emit('drag', $event, card)"
    @drop.prevent="$emit('drop', $event, card)"
    @dragstart="onDragStart"
    @dragend="$emit('dragend', $event, card)">
    <img :src="card.url"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card } from '../game/Card';

export default Vue.extend({
  name: 'Card',
  props: {
    card: Card,
    highlight: Boolean,
    inactive: Boolean,
  },
  methods: {
    onDragStart(evt: DragEvent) {
      if (evt.dataTransfer == null || this.inactive) {
        return;
      }
      /* eslint-disable no-param-reassign */
      // Parameter reassignment is unavoidable here,
      // that's just how JavaScript's event system works
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('uniqueId', this.card.uniqueId);
      /* eslint-enable */

      this.$emit('dragstart', evt, this.card);
    },
  },
});
</script>

<style>
.card {
  position: relative;
  height: 10rem;
  width: 7rem;
  transition: transform 100ms ease-in-out;
}
.card.obverse:not(.inactive):hover{
  transform: translateY(-20px);
}
.card img {
  height: 100%;
  width: 100%;
}
.card.highlight img {
  filter: brightness(80%);
}
</style>
