import { Button, Form, Input } from 'antd'
import styles from './styles.module.scss'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useAllContexts } from '@/contexts/useContexts'
import { UserLoginType } from '@/@types/types'

interface UserLoginProps {
  setErros: any
  erros: any
  handleChangeMode: any
}
export function UserLogin(props: UserLoginProps) {
  const { handleLoginSubmit } = useAllContexts()
  const handleUserLogin = async (data: UserLoginType) => {
    props.setErros([])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await handleLoginSubmit(data)
    if (response.status === 400) {
      return props.setErros(response.data.erros)
    }
  }
  const showInputsErros = (name: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return props.erros.some((obj: any) => obj.path === name)
  }
  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={handleUserLogin}
      className={styles.loginForm}
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
        <a style={{ width: '100%', textAlign: 'end' }}>Esqueceu sua senha ?</a>
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
          <a style={{ color: 'black' }} onClick={props.handleChangeMode}>
            Cadastre-se
          </a>
        </p>
      </Form.Item>
    </Form>
  )
}
