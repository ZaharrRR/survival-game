<script setup lang="ts">
import UserInfoBlock from '../userInfoBlock.vue'
</script>

<template>
  <div class="page">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/towns">Towns</RouterLink>
      </nav>
    </header>

    <main>
      <slot></slot>
    </main>

    <UserInfoBlock />
  </div>
</template>

<style scoped>
.page {
  position: relative;
}
</style>
