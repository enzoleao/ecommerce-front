import styles from './styles.module.scss'
import { Badge } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

export function Header(props: any) {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <section className={styles.leftSection}>
          <a href="/">Home</a>
          <a>Produtos</a>
        </section>
        <section className={styles.rightSection}>
          <Badge count={5}>
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
