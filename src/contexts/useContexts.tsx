import api from '@/services/api'
import { User, UserLogin } from '@/@types/types'
import { message } from 'antd'
import { NoticeType } from 'antd/es/message/interface'
import { AxiosResponse } from 'axios'
import { ReactNode, createContext, useContext, useState } from 'react'

interface MyContextProviderProps {
  children: ReactNode
}
interface AlertTypes {
  type: NoticeType
  message: string
}

type ContextsType = {
  user: User | null
  handleLoginSubmit: (data: UserLogin) => Promise<AxiosResponse | unknown>
  isAuthenticated: boolean
  contextHolder: ReactNode
  alertMessage: (data: AlertTypes) => void
}

export const Contexts = createContext({} as ContextsType)

export function ContextsProvider({ children }: MyContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()

  const alertMessage = ({ type, message }: AlertTypes) => {
    messageApi.open({
      type,
      content: message,
    })
  }
  const handleLoginSubmit = async (data: UserLogin): Promise<AxiosResponse> => {
    try {
      const response = await api.post('/session', {
        email: data.email,
        password: data.password,
      })
      setIsAuthenticated(true)
      setUser(response.data.user)
      alertMessage({ type: 'success', message: 'Autenticado com sucesso' })
      return response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      err.response.data?.erros.map((i: { msg: string }) => {
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
      }}
    >
      {children}
    </Contexts.Provider>
  )
}

export const useAllContexts = () => useContext(Contexts)
