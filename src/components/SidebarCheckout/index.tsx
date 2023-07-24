import styles from './styles.module.scss'
import { Button, Drawer } from 'antd'
import { SidebarCard } from '../SidebarCard'
import { useAllContexts } from '@/contexts/useContexts'
export function SidebarCheckout(props: any) {
  const { cart, contextHolder } = useAllContexts()

  const onClose = () => {
    props.setSidebarOpen(false)
  }

  return (
    <>
      <Drawer
        title={<p className="text-center">Checkout</p>}
        placement="right"
        width={500}
        onClose={onClose}
        open={props.sidebarOpen}
        footer={
          <div className={styles.buttonContainer}>
            <div className={styles.subtotal}>
              <p>SUB TOTAL</p>
              <span>
                <p>R$</p>
                <p>
                  {cart
                    ?.reduce((subtotal, objeto) => {
                      return subtotal + objeto?.subtotal
                    }, 0)
                    .toFixed(2)}
                </p>
              </span>
            </div>
            <Button
              onClick={() => console.log(cart)}
              className={styles.buttonSidebarFinish}
              size="large"
            >
              FINALIZAR
            </Button>
            <Button
              onClick={() => console.log(cart)}
              className={styles.buttonSidebar}
              size="large"
            >
              CONTINUAR COMPRANDO
            </Button>
          </div>
        }
      >
        <div className={styles.sidebarChecekoutContainer}>
          {typeof cart !== 'undefined' &&
            cart.map((i, index) => {
              return (
                <SidebarCard
                  id={i.id}
                  key={index}
                  image={i.image}
                  name={i.name}
                  price={i.price}
                  units={i.units}
                />
              )
            })}
        </div>
        {contextHolder}
      </Drawer>
    </>
  )
}
