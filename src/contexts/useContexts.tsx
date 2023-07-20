import api from '@/services/api'
import { RegisterUserTypes, User, UserLoginType } from '@/@types/types'
import { message } from 'antd'
import { NoticeType } from 'antd/es/message/interface'
import { AxiosResponse } from 'axios'
import { ReactNode, createContext, useContext, useState } from 'react'
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
}

export const Contexts = createContext({} as ContextsType)

export function ContextsProvider({ children }: MyContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()
  const { push } = useRouter()

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
  return (
    <Contexts.Provider
      value={{
        user,
        handleLoginSubmit,
        isAuthenticated,
        contextHolder,
        alertMessage,
        handleRegisterSubmit,
      }}
    >
      {children}
    </Contexts.Provider>
  )
}

export const useAllContexts = () => useContext(Contexts)
