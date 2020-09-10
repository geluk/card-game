<template>
  <div class="card">
    <img :src="card.url" />
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
.card:hover{
  transform: translateY(-20px);
}
.card img {
  height: 100%;
  width: 100%;
}
</style>
