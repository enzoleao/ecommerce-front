import { ShoppingCartOutlined } from '@ant-design/icons'
import styles from './styles.module.scss'
import { useState } from 'react'
import { useAllContexts } from '@/contexts/useContexts'

interface ProcutsCardProps {
  id: number
  image: string
  name: string
  price: number
  product: any
}
export function ProductCard(props: ProcutsCardProps) {
  const { handleAddProductOnCart } = useAllContexts()
  const product = props.product
  const [units, setUnits] = useState(1)
  const addProductToCart = () => {
    handleAddProductOnCart({
      ...product,
      units,
      id: product.id + new Date().getMilliseconds(),
      productId: product.id,
      subtotal: props.price * units,
    })
    setUnits(1)
  }
  return (
    <div className={styles.productCardContainer}>
      <div className={styles.imageContainer}>
        <img src={props.image} alt="" />
      </div>
      <div>
        <p>{props.name}</p>
        <span>
          <p>R$</p>
          <p>{props.price}</p>
        </span>
        <div>
          <span>
            <button
              onClick={() => {
                setUnits(units - 1)
              }}
              disabled={units <= 1}
            >
              -
            </button>
            <p>{units}</p>
            <button
              onClick={() => {
                setUnits(units + 1)
              }}
            >
              +
            </button>
          </span>
          <ShoppingCartOutlined
            style={{
              fontSize: '25px',
            }}
            className={styles.cartIcon}
            onClick={addProductToCart}
          />
        </div>
      </div>
    </div>
  )
}
