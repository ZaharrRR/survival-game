<template>
  <PageLayout>
    <div class="grid-container">
      <div class="grid"></div>
      <div class="towns">
        <div
          v-for="town in gameStore.towns"
          :key="town.id"
          class="towns-item"
          :style="town.position"
          @click="toTown(town.id)"
        >
          <span>{{ town.name }}</span>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { useGameStore } from '@/stores/gameStore'

import { useRouter } from 'vue-router'

const router = useRouter()

const gameStore = useGameStore()

const toTown = (townId: string) => {
  router.push(`/towns/${townId}`)
}
</script>

<style scoped>
.grid-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

.towns {
  position: relative;
  width: 100%;
  height: 100%;
}

.towns-item {
  position: absolute;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  transition: 0.3s;
}

.towns-item:hover {
  background-color: rgba(243, 243, 243, 0.8);
  scale: 1.1;
}
</style>
