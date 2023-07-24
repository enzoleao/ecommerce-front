export type User = {
  id: string
  name: string
  email: string
  phone: string
  birthday: string
  cpf: string
  roles: {
    id: number
    name: string
  }
}
export type UserLoginType = {
  email: string
  password: string
}
export type RegisterUserTypes = {
  name: string
  email: string
  phone: string
  birthday: Date
  cpf: string
  password: string
}

export type ProductCartType = {
  index: number
  id: number
  productId: number
  name: string
  units: number
  price: number
  image: string
  subtotal: number
}
