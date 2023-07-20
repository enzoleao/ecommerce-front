import React from 'react'
import { Button, Drawer, Space } from 'antd'
import styles from './styles.module.scss'
import { SidebarCard } from '../SidebarCard'
export function SidebarCheckout(props: any) {
  const showDrawer = () => {
    props.setSidebarOpen(true)
  }

  const onClose = () => {
    props.setSidebarOpen(false)
  }
  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title={<p className="text-center">Checkout</p>}
        placement="right"
        width={500}
        onClose={onClose}
        open={props.sidebarOpen}
        footer={
          <div className={styles.buttonContainer}>
            <Button className={styles.buttonSidebar} size="large">
              FINALIZAR
            </Button>
            <Button className={styles.buttonSidebar} size="large">
              CONTINUAR COMPRANDO
            </Button>
          </div>
        }
      >
        <SidebarCard />
      </Drawer>
    </>
  )
}