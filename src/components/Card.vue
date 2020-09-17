<template>
  <div
    class="card obverse draggable drop-zone"
    :class="{ highlight: highlight, inactive: inactive }"
    draggable
    @dragover.prevent
    @dragenter.prevent="$emit('dragenter', $event, card)"
    @dragleave.prevent="$emit('dragleave', $event, card)"
    @click="$emit('click', $event, card)"
    @drag="$emit('drag', $event, card)"
    @drop.prevent="$emit('drop', $event, card)"
    @dragstart="onDragStart"
    @dragend="$emit('dragend', $event, card)">
    <div class="card-overlay highlight">
    </div>
    <img :src="card.url"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card, CardId } from '../game/Card';

export default Vue.extend({
  name: 'Card',
  props: {
    card: Card,
    highlight: Boolean,
    inactive: Boolean,
  },
  methods: {
    onDragStart(evt: DragEvent) {
      if (evt.dataTransfer == null) {
        console.error('Drag event has no dataTransfer object!');
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
  height: 20vh;
  width: 14.2vh;

  transition: all 100ms ease-in-out;
}
.card.obverse:hover{
  transform: translateY(-20px);
}
.card img {
  height: 100%;
  width: 100%;
}
.card.highlight img {
  filter: brightness(80%);
}
.card-overlay {
  top:0;
  right:0;
  bottom:0;
  left:0;
}
</style>
