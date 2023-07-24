import api from '@/services/api'
import {
  ProductCartType,
  RegisterUserTypes,
  User,
  UserLoginType,
} from '@/@types/types'
import { message } from 'antd'
import { NoticeType } from 'antd/es/message/interface'
import { AxiosResponse } from 'axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'

interface MyContextProviderProps {
  children: ReactNode
}
interface AlertTypes {
  type: NoticeType
  message: string
}

type ContextsType = {
  user: User | null
  handleLoginSubmit: (data: UserLoginType) => Promise<AxiosResponse | unknown>
  isAuthenticated: boolean
  contextHolder: ReactNode
  alertMessage: (data: AlertTypes) => void
  handleRegisterSubmit: (
    data: RegisterUserTypes,
  ) => Promise<AxiosResponse | unknown>
  handleAddProductOnCart: (data: ProductCartType) => void
  cart: ProductCartType[] | undefined
  handleDeleteProductFromCart: (id: number) => void
}

export const Contexts = createContext({} as ContextsType)

export function ContextsProvider({ children }: MyContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [cart, setCart] = useState<ProductCartType[]>([])

  const { push } = useRouter()
  useEffect(() => {
    const getCartFromLocalStorage = () => {
      const getCartFromLocalStorage = localStorage.getItem('cart')
      const response = getCartFromLocalStorage
        ? JSON.parse(getCartFromLocalStorage)
        : []
      setCart(response)
    }
    getCartFromLocalStorage()
  }, [])
  const alertMessage = ({ type, message }: AlertTypes) => {
    messageApi.open({
      type,
      content: message,
    })
  }
  const handleLoginSubmit = async (
    data: UserLoginType,
  ): Promise<AxiosResponse> => {
    try {
      const response = await api.post('/session', {
        email: data.email,
        password: data.password,
      })
      setIsAuthenticated(true)
      setUser(response.data.user)
      alertMessage({ type: 'success', message: 'Autenticado com sucesso' })
      setTimeout(() => {
        push('/dashboard')
      }, 2000)
      return response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      err.response.data?.erros.map((i: { msg: string }) => {
        return alertMessage({ type: 'error', message: i.msg })
      })
      return err.response
    }
  }
  const handleRegisterSubmit = async (
    data: RegisterUserTypes,
  ): Promise<AxiosResponse> => {
    try {
      console.log('aq')
      const { name, email, birthday, phone, password, cpf } = data
      const response = await api.post('/users', {
        name,
        email,
        birthday: birthday?.toISOString(),
        phone,
        password,
        cpf,
      })
      alertMessage({ type: 'success', message: 'Cadastrado com sucesso' })
      setTimeout(() => {
        push('/login')
      }, 2000)
      return response
    } catch (err: any) {
      err.response.data.erros.map((i: { msg: string }) => {
        return alertMessage({ type: 'error', message: i.msg })
      })

      return err.response
    }
  }
  const handleAddProductOnCart = async (data: ProductCartType) => {
    setCart([...cart, data])
    localStorage.setItem('cart', JSON.stringify([...cart, data]))
  }
  const handleDeleteProductFromCart = async (id: number) => {
    const cartWithoutItemRemoved = cart.filter((obj) => obj.id !== id)
    setCart(cartWithoutItemRemoved)
    localStorage.setItem('cart', JSON.stringify(cartWithoutItemRemoved))
    alertMessage({ type: 'success', message: 'Item removido com sucesso' })
  }
  return (
    <Contexts.Provider
      value={{
        user,
        handleLoginSubmit,
        isAuthenticated,
        contextHolder,
        alertMessage,
        handleRegisterSubmit,
        handleAddProductOnCart,
        cart,
        handleDeleteProductFromCart,
      }}
    >
      {children}
    </Contexts.Provider>
  )
}

export const useAllContexts = () => useContext(Contexts)
