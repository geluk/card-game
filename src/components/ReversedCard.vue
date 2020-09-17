<template>
  <div
    class="card reverse"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave">
    <img src="/img/cards/card-back.svg" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card } from '../game/Card';

export default Vue.extend({
  name: 'ReversedCard',
  props: {
    card: Card,
    preventEvents: Boolean,
  },
  methods: {
    onDragEnter(evt: DragEvent) {
      if (this.preventEvents) {
        evt.preventDefault();
      }
    },
    onDragLeave(evt: DragEvent) {
      if (this.preventEvents) {
        evt.preventDefault();
      }
    },
  },
});
</script>

<style scoped>
</style>
