import styles from './styles.module.scss'
import { Badge } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useAllContexts } from '@/contexts/useContexts'

export function Header(props: any) {
  const { cart } = useAllContexts()
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <section className={styles.leftSection}>
          <a href="/">Home</a>
        </section>
        <section className={styles.rightSection}>
          <Badge count={cart?.length}>
            <ShoppingCartOutlined
              onClick={() => props.setSidebarOpen(true)}
              className={styles.rightSectionIcons}
            />
          </Badge>
          <a href="/login">
            <UserOutlined className={styles.rightSectionIcons} />
          </a>
        </section>
      </div>
    </div>
  )
}
