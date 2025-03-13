<script setup lang="ts">
import type { Member } from '@/ts/types/Member.ts'
import { ref, watch } from 'vue'
import { useMembersStore } from '@/stores/members.ts'

const props = defineProps<{
  item: Member
  index: number
}>()

const memberStore = useMembersStore()

const showPassword = ref(false)

const login = defineModel('login')
const password = defineModel('password')
login.value = props.item.login
password.value = props.item.password

function handleDelete() {
  memberStore.deleteMember(props.item.id)
}

watch(login, (newVal) => {
  memberStore.updateMember(props.index, 'login', newVal)
})
</script>

<template>
  <form class="mb-3 member" @submit.prevent="handleDelete">
    <div class="d-flex align-items-center gap-3">
      <input type="text" class="form-control member__input" v-model="login" />
      <div class="form-control d-flex align-items-center">
        <input
          class="form-control-plaintext"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
        />
        <button type="button" class="btn btn-light" @click="showPassword = !showPassword">
          <img
            v-if="showPassword"
            src="@/assets/images/icons/eye.svg"
            width="16"
            height="16"
            alt=""
          />
          <img v-else src="@/assets/images/icons/eye-slash.svg" width="16" height="16" alt="" />
        </button>
      </div>
      <button class="btn btn-danger member__delete">
        <img src="@/assets/images/icons/delete.svg" width="16" height="16" alt="" />
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.member {
  &__delete {
    img {
      filter: invert(1);
    }
  }

  &__input {
    min-height: 52px;
  }
}
</style>
