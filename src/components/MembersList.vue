<script setup lang="ts">
import type { Member } from '@/ts/types/Member.ts'
import MemberItem from '@/components/MemberItem.vue'

const props = defineProps<{
  items: Member[]
}>()
</script>

<template>
  <div class="members">
    <div class="members__items">
      <MemberItem v-for="(item, index) in props.items" :item="item" :index="index" :key="index" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
