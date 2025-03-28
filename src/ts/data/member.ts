import type { Member } from '@/ts/types/Member.ts'

export const member: Member = {
  id: 0,
  login: '',
  password: '',
  label: '',
  type: [
    {
      id: 'local',
      name: 'Локальная'
    },
    {
      id: 'LDAP',
      name: 'LDAP'
    }
  ]
}
