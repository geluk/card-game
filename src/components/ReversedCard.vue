<template>
  <div
    class="card reverse"
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave">
    <img src="/img/cards/card-back.svg" />
  </div>
</template>

<script lang="ts">
import ApplicationError from '@/common/ApplicationError';
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
    getUniqueId(evt: DragEvent): string {
      if (!evt.dataTransfer) {
        throw new ApplicationError('Drop event has no dataTransfer object!');
      }
      return evt.dataTransfer.getData('uniqueId');
    },
  },
});
</script>

<style scoped>
</style>
