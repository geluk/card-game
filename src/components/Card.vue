<template>
  <div
    class="card obverse"
    draggable
    v-on:click="$emit('click', $event, card)"
    v-on:drag="$emit('drag', $event, card)"
    v-on:drop="$emit('drop', $event, card)"
    v-on:dragstart="onDragStart"
    v-on:dragend="$emit('dragend', $event, card)">
    <img :src="card.url"/>
    <!-- <p> cardId: {{ card.cardId }} </p>
    <p> setId: {{ card.setId }} </p>
    <p> uniqueId: {{ card.uniqueId }} </p>
    <p> Url: {{ card.url }} </p> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card, CardId } from '../game/card';

export default Vue.extend({
  name: 'Card',
  methods: {
    onDragStart(evt: DragEvent) {
      if (evt.dataTransfer == null) {
        console.error('Drag event has no dataTransfer object!');
        return;
      }
      /* eslint-disable no-param-reassign */
      /* Parameter reassignment unavoidable here,
       * that's just how JavaScript's event system works
       */
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('uniqueId', this.card.uniqueId);
      /* eslint-enable */

      this.$emit('dragstart', evt, this.card);
    },
  },
  props: {
    card: Card,
  },
});
</script>

<style>
.card {
  height: 20vh;
  width: 14.2vh;

  transition: all 100ms ease-in-out;
}
.card.reverse {
  top: 10px;
}
.card.obverse:hover{
  transform: translateY(-20px);
}
.card img {
  height: 100%;
  width: 100%;
}
</style>
