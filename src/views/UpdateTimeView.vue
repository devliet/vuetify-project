<template>
  <div>
                Current time: {{ currentTime }}
            </div>
            <TheButton @click="onUpdateTimeClick">Update Time</TheButton>
</template>

<script setup>
import { ref } from 'vue';
const currentTime = ref(new Date().toLocaleTimeString());

const onUpdateTimeClick = () => {
    currentTime.value = new Date().toLocaleTimeString();
};
</script>

<style>

</style>
