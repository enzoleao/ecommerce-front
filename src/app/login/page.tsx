'use client'
import Image from 'next/image'
import styles from './styles.module.scss'
import LoginImage from '../../../public/login-image.svg'
import { useState } from 'react'
import { useAllContexts } from '@/contexts/useContexts'
import { Header } from '@/components/Header'
import { UserLogin } from '@/components/UserLogin'
import { RegisterUser } from '@/components/RegisterUser'

export default function Login() {
  const { contextHolder } = useAllContexts()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [erros, setErros] = useState([])

  const handleChangeMode = () => {
    setErros([])
    setIsLoginMode(!isLoginMode)
  }

  return (
    <div className={styles.loginWrapper}>
      {contextHolder}
      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className={styles.loginContainer}>
        <main
          className={`${
            isLoginMode ? styles.loginMain : styles.loginMainActive
          }`}
        >
          <section className={styles.leftSection}>
            {isLoginMode ? (
              <UserLogin
                erros={erros}
                setErros={setErros}
                handleChangeMode={handleChangeMode}
              />
            ) : (
              <RegisterUser
                erros={erros}
                setErros={setErros}
                handleChangeMode={handleChangeMode}
              />
            )}
          </section>
          <section className={styles.rightSection}>
            <Image
              className={`${
                isLoginMode ? styles.imageLogin : styles.imageLoginActive
              }`}
              src={LoginImage}
              alt=""
              priority={true}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
