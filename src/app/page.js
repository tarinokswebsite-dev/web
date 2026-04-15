'use client'
import { useState } from 'react'
import styles from "./page.module.css"
import Landing from '../components/Landing'
import Filter from '../components/Filter'
import Category from '../components/Category'
import CategoryProducts from '../components/CategoryProducts'

export default function Home() {
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleBack = () => setActiveCategoryId('all')

  return (
    <div className={styles.page}>
      <Landing onSearch={setSearchQuery} />
      <Filter onFilterChange={setActiveCategoryId} />

      {/* Show EITHER categories OR products, never both */}
      {activeCategoryId === 'all' ? (
        <Category
          activeCategoryId={activeCategoryId}
          onCategorySelect={setActiveCategoryId}
        />
      ) : (
        <CategoryProducts
          activeCategoryId={activeCategoryId}
          onBack={handleBack}
        />
      )}
    </div>
  )
}