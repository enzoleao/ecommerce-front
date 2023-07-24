'use client'
import { Header } from '@/components/Header'
import styles from './styles.module.scss'
import { SidebarCheckout } from '@/components/SidebarCheckout'
import { useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { productsService } from '@/services/products'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className={styles.homeWrapper}>
      <Header setSidebarOpen={setSidebarOpen} />
      <div className={styles.homeContainer}>
        <header>
          <Input
            placeholder="Buscar ..."
            style={{ maxWidth: '200px' }}
            suffix={<SearchOutlined />}
          />
        </header>
        <main>
          {productsService.map((i, index) => {
            return (
              <ProductCard
                id={i.id}
                product={i}
                image={i.image}
                name={i.name}
                price={i.price}
                key={i.id}
              />
            )
          })}
        </main>
      </div>
      <SidebarCheckout
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
    </div>
  )
}
