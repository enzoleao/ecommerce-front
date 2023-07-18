'use client'
import 'dayjs/locale/pt-br'
import Image from 'next/image'
import styles from './styles.module.scss'
import dayjs, { Dayjs } from 'dayjs'
import LoginImage from '../../../public/login-image.svg'
import locale from 'antd/locale/pt_BR'
import { useState } from 'react'
import { Button, ConfigProvider, DatePicker, Form, Input } from 'antd'
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useAllContexts } from '@/contexts/useContexts'
import { RegisterUserTypes, UserLogin } from '@/@types/types'

export default function Login() {
  const { handleLoginSubmit, contextHolder, handleRegisterSubmit } =
    useAllContexts()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [erros, setErros] = useState([])
  const handleUserLogin = async (data: UserLogin) => {
    setErros([])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await handleLoginSubmit(data)
    if (response.status === 400) {
      return setErros(response.data.erros)
    }
  }
  const handleChangeMode = () => {
    setErros([])
    setIsLoginMode(!isLoginMode)
  }
  const handleUserRegister = async (data: RegisterUserTypes) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await handleRegisterSubmit(data)
    if (response.status === 400) {
      return setErros(response.data.erros)
    }
  }
  const showInputsErros = (name: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return erros.some((obj: any) => obj.path === name)
  }
  const disableDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day')
  }
  return (
    <div className={styles.loginWrapper}>
      {contextHolder}
      <div className={styles.loginContainer}>
        <main
          className={`${
            isLoginMode ? styles.loginMain : styles.loginMainActive
          }`}
        >
          <section className={styles.leftSection}>
            {isLoginMode ? (
              <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={handleUserLogin}
                style={{ width: '100%' }}
              >
                <Form.Item
                  validateStatus={showInputsErros('auth') ? 'error' : undefined}
                  hasFeedback
                  name="email"
                  className={styles.formItem}
                >
                  <Input
                    size="large"
                    type="email"
                    style={{ borderRadius: 2 }}
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="E-mail"
                    autoComplete="disabled"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  className={styles.formItem}
                  validateStatus={showInputsErros('auth') ? 'error' : undefined}
                  hasFeedback
                >
                  <Input.Password
                    style={{ borderRadius: 2 }}
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                  className={styles.formItem}
                >
                  <a style={{ width: '100%', textAlign: 'end' }}>
                    Esqueceu sua senha ?
                  </a>
                </Form.Item>
                <Form.Item className={styles.formItem}>
                  <Button
                    size="large"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: '100%' }}
                  >
                    ENTRAR
                  </Button>
                </Form.Item>
                <Form.Item
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  className={styles.formItem}
                >
                  <p className={styles.loginAndRegister}>
                    Ainda não possui conta ?{' '}
                    <a style={{ color: 'black' }} onClick={handleChangeMode}>
                      Cadastre-se
                    </a>
                  </p>
                </Form.Item>
              </Form>
            ) : (
              <ConfigProvider locale={locale}>
                <Form
                  name="normal_login"
                  initialValues={{ remember: true }}
                  onFinish={handleUserRegister}
                  style={{ width: '100%' }}
                >
                  <Form.Item
                    validateStatus={
                      showInputsErros('name') ? 'error' : undefined
                    }
                    hasFeedback
                    name="name"
                    className={styles.formItem}
                  >
                    <Input
                      size="large"
                      style={{ borderRadius: 2 }}
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Nome"
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={
                      showInputsErros('email') ? 'error' : undefined
                    }
                    hasFeedback
                    name="email"
                    className={styles.formItem}
                  >
                    <Input
                      size="large"
                      type="email"
                      style={{ borderRadius: 2 }}
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="E-mail"
                    />
                  </Form.Item>
                  <Form.Item name="phone" className={styles.formItem}>
                    <Input
                      size="large"
                      style={{ borderRadius: 2 }}
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      placeholder="Telefone"
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={
                      showInputsErros('cpf') ? 'error' : undefined
                    }
                    hasFeedback
                    name="cpf"
                    className={styles.formItem}
                  >
                    <Input
                      size="large"
                      style={{ borderRadius: 2 }}
                      prefix={
                        <SolutionOutlined className="site-form-item-icon" />
                      }
                      placeholder="CPF"
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={
                      showInputsErros('birthday') ? 'error' : undefined
                    }
                    hasFeedback
                    name="birthday"
                    className={styles.formItem}
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="Data de Nascimento"
                      size="large"
                      disabledDate={disableDate}
                      format={['DD/MM/YYYY']}
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={
                      showInputsErros('password') ? 'error' : undefined
                    }
                    hasFeedback
                    name="password"
                    className={styles.formItem}
                  >
                    <Input.Password
                      size="large"
                      type="password"
                      style={{ borderRadius: 2 }}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Senha"
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={
                      showInputsErros('password') ? 'error' : undefined
                    }
                    hasFeedback
                    className={styles.formItem}
                  >
                    <Input.Password
                      size="large"
                      type="password"
                      style={{ borderRadius: 2 }}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Confirmar Senha"
                    />
                  </Form.Item>

                  <Form.Item className={styles.formItem}>
                    <Button
                      size="large"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ width: '100%' }}
                    >
                      CADASTRAR
                    </Button>
                  </Form.Item>
                  <Form.Item
                    className={styles.formItem}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <p className={styles.loginAndRegister}>
                      Ja possui conta ?{' '}
                      <a style={{ color: 'black' }} onClick={handleChangeMode}>
                        Realizar Login
                      </a>
                    </p>
                  </Form.Item>
                </Form>
              </ConfigProvider>
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
