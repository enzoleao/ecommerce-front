import { DeleteOutlined } from '@ant-design/icons'
import styles from './styles.module.scss'

interface ProductsProps {
  name: string
  price: number
  units: number
}

export function SidebarCard() {
  return (
    <div className={styles.cardContainer}>
      <section className={styles.leftSection}>
        <img
          src="https://m.media-amazon.com/images/I/41K0G9FgD4L._AC_SX679_.jpg"
          alt=""
          className={styles.imageCard}
        />
      </section>
      <section className={styles.rightSection}>
        <header>
          <p className="text-center">IPhone 13 - 128 GB</p>
        </header>
        <main>
          <p>R$</p>
          <p>4999.90</p>
        </main>
        <footer>
          <span>
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </span>
          <DeleteOutlined style={{ color: '#ff0000' }} />
        </footer>
      </section>
    </div>
  )
}
