<script setup lang='ts'>
import type { Member } from '@/ts/types/Member.ts'
import MemberItem from '@/components/MemberItem.vue'

const props = defineProps<{
  items: Member[]
}>()
</script>

<template>
  <div class='members'>
    <div class='members__items'>
      <MemberItem v-for='item in props.items' :item='item' :key='item.id' />
    </div>
  </div>
</template>