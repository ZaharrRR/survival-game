<template>
  <div v-if="!isLoading" class="town-container">
    <h1>{{ town?.name }}</h1>

    <div class="district-grid">
      <div v-for="(district, index) in districts" :key="index" class="district">
        <div
          v-for="building in district"
          :key="building.id"
          class="building"
          @click="router.push(`/towns/${townId}/${building.id}`)"
        >
          {{ building.name }}
          <p class="building-address">{{ building.address }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else>loading...</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

import type { Town } from '@/domain/types'

import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
const router = useRouter()

const props = defineProps({
  townId: String,
})

const town = ref<Town>()

const isLoading = ref(true)

onMounted(async () => {
  town.value = await gameStore.getTown(String(props.townId))

  isLoading.value = false
})

const districts = computed(() => {
  const buildings = town.value?.buildings || []
  const districtsArray = []

  for (let i = 0; i < buildings.length; i += 6) {
    districtsArray.push(buildings.slice(i, i + 6))
  }

  return districtsArray
})
</script>

<style scoped>
.town-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.district-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 30px;

  margin-top: 24px;

  width: 100%;
  height: 100%;
}

.district {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  border: 2px solid black;
  padding: 10px;
}

.building {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  border: 4px solid black;
  padding: 4px;
  height: 100px;

  cursor: pointer;
}

.building-address {
  font-size: 12px;
}
</style>
