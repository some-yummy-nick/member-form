<script setup lang='ts'>
import type { Member } from '@/ts/types/Member.ts'
import { ref, watch } from 'vue'
import { useMembersStore } from '@/stores/members.ts'
import type { Fields } from '@/ts/types/Fields.ts'

const props = defineProps<{
  item: Member
}>()

const memberStore = useMembersStore()

const showPassword = ref(false)
const showPasswordField = ref(true)

const login = defineModel('login')
const password = defineModel('password')
const type = defineModel('type')
const label = defineModel('label')
const selected = ref('')
const errors = ref([] as Fields[])
const required = ['password', 'login']

login.value = props.item.login
password.value = props.item.password
type.value = props.item.type
selected.value = props.item.type[0].id

if (props.item.label) {
  label.value = props.item.label.map(el => el.text).join(';')
}

function handleDelete() {
  memberStore.deleteMember(props.item.id)
}

function validation(name: string, value: string) {
  return !(required.includes(name) && value == '')
}

function checkValidation(name: Fields, value: string) {
  console.log(name)
  if (validation(name, value)) {
    const errorIndex = errors.value.findIndex((el) => el === name)
    if (errorIndex >= 0) {
      errors.value.splice(errorIndex, 1)
    }
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

watch(label, (newVal: any) => {
  const toArray = newVal.split(';')
  const toObject = toArray.map(item => {
    return { text: item }
  })
  memberStore.updateMember(props.item.id, 'label', toObject)
})

watch(selected, (newVal: any) => {
  showPasswordField.value = true

  if (newVal === 'LDAP') {
    password.value = null
    showPasswordField.value = false
  }
})
</script>

<template>
  <form class='mb-3 member' @submit.prevent='handleDelete'>
    <div class='row g-3'>
      <div class='col-md-3'>
        <label for="label" class="form-label text-secondary">Метки</label>
        <input
          id='label'
          type='text'
          class='form-control member__input'
          maxlength='50'
          v-model='label'
        />
      </div>
      <div class='col-md-3'>
        <label for="type" class="form-label text-secondary">Тип записи</label>

        <select id="type" class='form-select member__select' aria-label='type' v-model='selected'>
          <option v-for='item in type' :value='item.id'>{{ item.name }}</option>
        </select>
      </div>
      <div class='col-md-3'>
        <label for="login" class="form-label text-secondary">Логин</label>
        <input
          id='login'
          type='text'
          class='form-control member__input'
          maxlength='100'
          @blur="(e)=>checkValidation('login',e.target.value)"
          :class="{ 'is-invalid': errors.includes('login') }"
          v-model='login'
        />
      </div>
      <div class='col-md-3'>
        <label for="password" class="form-label text-secondary">Пароль</label>
        <div class='d-flex align-items-center gap-2'>
          <div
            v-if='showPasswordField'
            class='form-control d-flex align-items-center'
            :class="{ 'is-invalid': errors.includes('password') }"
          >
            <input
              id='password'
              class='form-control-plaintext'
              maxlength='100'
              :type="showPassword ? 'text' : 'password'"
              v-model='password'
              @blur="(e)=>checkValidation('password',e.target.value)"
            />
            <button type='button' class='btn btn-light' @click='showPassword = !showPassword'>
              <img
                v-if='showPassword'
                src='@/assets/images/icons/eye.svg'
                width='16'
                height='16'
                alt=''
              />
              <img v-else src='@/assets/images/icons/eye-slash.svg' width='16' height='16' alt='' />
            </button>
          </div>
          <button class='btn btn-danger member__delete'>
            <img src='@/assets/images/icons/delete.svg' width='16' height='16' alt='' />
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped lang='scss'>
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
