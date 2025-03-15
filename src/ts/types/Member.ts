export type Member = {
  id: number
  login: string
  password: string
  label: string
  type: {
    id: string
    name: string
  }[]
}
