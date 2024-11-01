<template>
  <div
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    class="user-info-block"
  >
    <div class="content" v-if="isHover">
      <h3>Zahar</h3>
      <div>
        <p>health: <strong>32</strong></p>
        <progress max="100" value="32">32%</progress>
      </div>

      <div>
        <p>food: <strong>44</strong></p>
        <progress max="100" value="44">44%</progress>
      </div>

      <div>
        <p>weapon:</p>
        <p>Iron Axe</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isHover = ref(false)

const showBar = () => {
  setInterval(function () {
    isHover.value = true
  }, 500)
}
</script>

<style scoped>
.user-info-block {
  position: absolute;
  top: 0;
  right: 0;

  height: 5px;
  width: 200px;
  background-color: #333;

  transition: 0.3s;
}

.user-info-block:hover {
  height: 200px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 24px;
  color: white;
}
</style>
