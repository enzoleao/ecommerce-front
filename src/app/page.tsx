'use client'
import { Header } from '@/components/Header'
import styles from './styles.module.scss'
import { SidebarCheckout } from '@/components/SidebarCheckout'
import { useState } from 'react'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className={styles.homeWrapper}>
      <Header setSidebarOpen={setSidebarOpen} />
      <div className={styles.homeContainer}>Container</div>
      <SidebarCheckout
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
    </div>
  )
}
