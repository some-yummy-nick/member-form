<script setup lang="ts">
import Header from '@/components/Header.vue'
import Members from '@/components/Members.vue'

function handleAdd() {}
</script>

<template>
  <Header @handleAdd="handleAdd" />
  <main>
    <Members />
  </main>
</template>

<style scoped lang="scss"></style>
