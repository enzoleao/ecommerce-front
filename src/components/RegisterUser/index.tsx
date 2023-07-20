import { Button, ConfigProvider, DatePicker, Form, Input } from 'antd'
import styles from './styles.module.scss'
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons'
import 'dayjs/locale/pt-br'
import dayjs, { Dayjs } from 'dayjs'
import locale from 'antd/locale/pt_BR'
import { useAllContexts } from '@/contexts/useContexts'
import { RegisterUserTypes } from '@/@types/types'

interface RegisterUserProps {
  erros: any
  setErros: any
  handleChangeMode: any
}
export function RegisterUser(props: RegisterUserProps) {
  const { handleRegisterSubmit } = useAllContexts()
  const handleUserRegister = async (data: RegisterUserTypes) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await handleRegisterSubmit(data)
    if (response.status === 400) {
      return props.setErros(response.data.erros)
    }
  }
  const showInputsErros = (name: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return props.erros.some((obj: any) => obj.path === name)
  }
  const disableDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day')
  }
  return (
    <ConfigProvider locale={locale}>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={handleUserRegister}
        className={styles.formRegister}
        style={{ width: '100%' }}
      >
        <Form.Item
          validateStatus={showInputsErros('name') ? 'error' : undefined}
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
          validateStatus={showInputsErros('email') ? 'error' : undefined}
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
          validateStatus={showInputsErros('cpf') ? 'error' : undefined}
          hasFeedback
          name="cpf"
          className={styles.formItem}
        >
          <Input
            size="large"
            style={{ borderRadius: 2 }}
            prefix={<SolutionOutlined className="site-form-item-icon" />}
            placeholder="CPF"
          />
        </Form.Item>
        <Form.Item
          validateStatus={showInputsErros('birthday') ? 'error' : undefined}
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
          validateStatus={showInputsErros('password') ? 'error' : undefined}
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
          validateStatus={showInputsErros('password') ? 'error' : undefined}
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
            <a style={{ color: 'black' }} onClick={props.handleChangeMode}>
              Realizar Login
            </a>
          </p>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
