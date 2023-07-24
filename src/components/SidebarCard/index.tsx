import styles from './styles.module.scss'
import { DeleteOutlined } from '@ant-design/icons'
import { useAllContexts } from '@/contexts/useContexts'

interface ProductsProps {
  id: number
  name: string
  price: number
  units: number
  image: string
}

export function SidebarCard(props: ProductsProps) {
  const { handleDeleteProductFromCart } = useAllContexts()
  return (
    <div className={styles.cardContainer}>
      <section className={styles.leftSection}>
        <img src={props.image} alt="" className={styles.imageCard} />
      </section>
      <section className={styles.rightSection}>
        <header>
          <p className="text-center">{props.name}</p>
        </header>
        <main>
          <p>R$</p>
          <p>{(props.units * props.price).toFixed(2)}</p>
        </main>
        <footer>
          <div>
            <button>-</button>
            <span>{props.units}</span>
            <button>+</button>
          </div>
          <DeleteOutlined
            onClick={() => handleDeleteProductFromCart(props.id)}
            style={{ color: '#ff0000', fontSize: '25px', cursor: 'pointer' }}
          />
        </footer>
      </section>
    </div>
  )
}
