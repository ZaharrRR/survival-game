<template>
  <div v-if="!isLoading">
    <h1>{{ building?.name }}</h1>
    <div class="rooms-container">
      <div v-for="room in building?.rooms" :key="room.id" class="room-card">
        <h3>{{ room.name }}</h3>

        <div class="room-details">
          <span>Loot: {{ room.loot.length }}</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading-container">
    <div class="loading-spinner"></div>
    <div>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { Building } from '@/domain/types'

import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const props = defineProps({
  buildingId: String,
  townId: String,
})

const building = ref<Building>()

const isLoading = ref(true)

onMounted(async () => {
  building.value = await gameStore.getBuilding(
    String(props.buildingId),
    String(props.townId),
  )

  isLoading.value = false
})
</script>

<style scoped>
.rooms-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  margin-top: 24px;
}

.room-card {
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.room-card:hover {
  transform: scale(1.05);
}

.room-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
}

.room-details {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #555;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
