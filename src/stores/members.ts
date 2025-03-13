import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Member } from '@/ts/types/Member.ts'

export const useMembersStore = defineStore('members', {
  state: () => ({
    members: ref([] as Member[]),
  }),
  actions: {
    setMember(member: Member) {
      this.members.push(member)
    },
    deleteMember(id: number) {
      const index = this.members.findIndex((member) => member.id === id)
      this.members.splice(index, 1)
    },
    updateMember(id: number, prop: 'login' | 'password', value: string) {
      const element: Member | undefined = this.members.find((member) => member.id === id)
      if (element) {
        element[prop] = value
      }
    },
  },
})
