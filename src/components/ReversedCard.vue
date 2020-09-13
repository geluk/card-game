<template>
  <div class="card reverse">
    <img src="/img/cards/card-back.svg" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card, CardId } from '../game/Card';

export default Vue.extend({
  name: 'ReversedCard',
  props: {
    card: Card,
  },
});
</script>

<style scoped>
</style>
