<script setup lang="ts">
import Header from '@/components/Header.vue'
import MembersList from '@/components/MembersList.vue'
import { useMembersStore } from '@/stores/members.ts'
import { member } from '@/ts/data/member.ts'
import { onMounted, watch } from 'vue'
import type { Member } from '@/ts/types/Member.ts'

const memberStore = useMembersStore()

const members = memberStore.members
const required = ['login', 'password']

function handleAdd() {
  const lastMember = members.at(-1)
  const currentMember = { ...member }
  if (lastMember) {
    currentMember.id = lastMember.id + 1
  }
  memberStore.setMember(currentMember)
}

function checkLocalMembers() {
  let members = localStorage.getItem('members')
  if (members) {
    members = JSON.parse(members)
    members.forEach((member: Member) => {
      memberStore.setMember(member)
    })
  }
}

watch(members, (newValue) => {
  const savedMembers: Member[] = []
  newValue.forEach((item) => {
    let isValid = true
    Object.entries(item).forEach((element) => {
      const [key, value] = element
      if (required.includes(key) && !value) {
        isValid = false
      }
    })
    if (isValid) {
      savedMembers.push(item)
    }
  })
  localStorage.setItem('members', JSON.stringify(savedMembers))
})

onMounted(() => {
  checkLocalMembers()
})
</script>

<template>
  <Header @handle-add="handleAdd" />
  <main>
    <MembersList :items="members" />
  </main>
</template>

<style scoped lang="scss"></style>
