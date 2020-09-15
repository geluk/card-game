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
import { Card, CardId } from '../game/Card';

export default Vue.extend({
  name: 'ReversedCard',
  props: {
    card: Card,
    preventEvents: Boolean,
  },
  methods: {
    onDragEnter(evt: DragEvent) {
      const uniqueId = this.getUniqueId(evt);
      console.log(`reversed card entered by ${uniqueId}`);
      if (this.preventEvents) {
        evt.preventDefault();
      }
    },
    onDragLeave(evt: DragEvent) {
      const uniqueId = this.getUniqueId(evt);
      console.log(`reversed card exited by ${uniqueId}`);
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
