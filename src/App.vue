<template>
  <div v-if="!isLoading">
    <RouterView />
  </div>

  <div v-else>loading...</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const isLoading = ref(true)

const sleep = (delay: number) =>
  new Promise(resolve => setTimeout(resolve, delay))

onMounted(async () => {
  await gameStore.gameInitialization(6)
  await sleep(1000)
  isLoading.value = false
})
</script>

<style scoped></style>
