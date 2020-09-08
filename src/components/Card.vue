<template>
  <div class="card">
    <img :src="card.url" />
    <!-- <p> Id: {{card.cardId }} </p>
    <p> setId: {{card.setId }} </p>
    <p> Url: {{card.url }} </p> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card, CardId } from '../game/card';

export default Vue.extend({
  name: 'Card',
  props: {
    card: Card,
  },
});
</script>

<style scoped>
.card {
  height: 100%;
  transition: all 100ms ease-in-out;
}
.card:hover{
  transform: translateY(-20px);
}
.card img {
  height: 100%;
}
</style>
