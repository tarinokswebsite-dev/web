'use client'
import { useState } from 'react';
import styles from "./page.module.css";
import Landing from '../components/Landing'
import Filter from '../components/Filter'
import Products from '../components/Products'

export default function Home() {
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className={styles.page}>
      <Landing onSearch={setSearchQuery} />
      <Filter onFilterChange={setActiveCategoryId} />
      <Products activeCategoryId={activeCategoryId} searchQuery={searchQuery} />
    </div>
  )
}