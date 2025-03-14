export type Member = {
  id: number
  login: string
  password: string
  type: {
    id: string
    name: string
  }[]
}
