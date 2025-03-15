import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Member } from '@/ts/types/Member.ts'
import type { Fields } from '@/ts/types/Fields.ts'

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
      const currentLocalStorage=JSON.parse(localStorage.getItem('members'))
      currentLocalStorage.splice(index, 1)
      localStorage.setItem('members', JSON.stringify(currentLocalStorage))
    },
    updateMember(id: number, prop: Fields, value: string) {
      const element: Member | undefined = this.members.find((member) => member.id === id)
      if (element) {
        element[prop] = value
      }
    },
  },
})
