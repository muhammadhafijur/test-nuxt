<template>
  <div>
    <h1>Current Count: {{ data?.count }}</h1>
    <button @click="updateCount">Increment</button>
  </div>
</template>

<script setup>
import useImageControls from '../composables/useControls.js';

const { updateCount, data } = useImageControls();
</script>
