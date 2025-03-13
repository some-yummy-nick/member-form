<script setup lang="ts">
import type { Member } from '@/ts/types/Member.ts'
import { ref, watch } from 'vue'
import { useMembersStore } from '@/stores/members.ts'
import type { Fields } from '@/ts/types/Fields.ts'

const props = defineProps<{
  item: Member
  index: number
}>()

const memberStore = useMembersStore()

const showPassword = ref(false)

const login = defineModel('login')
const password = defineModel('password')
const errors = ref([] as Fields[])
const required = ['password', 'login']

login.value = props.item.login
password.value = props.item.password

function handleDelete() {
  memberStore.deleteMember(props.item.id)
}

function validation(name: string, value: string) {
  return !(required.includes(name) && !value)
}

function checkValidation(name: Fields, value: string) {
  if (validation(name, value)) {
    const errorIndex = errors.value.findIndex((el) => el === name)
    errors.value.splice(errorIndex, 1)
    memberStore.updateMember(props.item.id, name, value)
  } else {
    errors.value.push(name)
  }
}

watch(login, (newVal: any) => {
  checkValidation('login', newVal)
})

watch(password, (newVal: any) => {
  checkValidation('password', newVal)
})
</script>

<template>
  <form class="mb-3 member" @submit.prevent="handleDelete">
    <div class="d-flex align-items-center gap-3">
      <input
        type="text"
        class="form-control member__input"
        maxlength="100"
        :class="{ 'is-invalid': errors.includes('login') }"
        v-model="login"
      />
      <div
        class="form-control d-flex align-items-center"
        :class="{ 'is-invalid': errors.includes('password') }"
      >
        <input
          class="form-control-plaintext"
          maxlength="100"
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

  &__input,
  &__select {
    min-height: 52px;
  }

  &__input,
  &__select,
  .form-control-plaintext {
    &:user-invalid,
    &.is-invalid {
      border-color: red;
    }
  }
}
</style>
