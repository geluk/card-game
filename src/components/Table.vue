<template>
  <div
    id="table"
    class="drop-zone"
    @drop.prevent="onDrop">
    <p>Completed sets will go here.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Table',
  props: {
  },
  methods: {
    onDrop() {
      console.log('drop!');
    },
  },
  components: {
  },
});

</script>

<style scoped>
#table {
  border: 1px solid green;
}
</style>
