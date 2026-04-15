'use client'
import { useState, useEffect } from 'react'
import styles from "./page.module.css"
import Landing from '../components/Landing'
import Filter2 from '../components/Filter2'
import Category from '../components/Category'
import CategoryProducts from '../components/CategoryProducts'

export default function Home() {
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Restore category when user comes back from product page
  useEffect(() => {
    const saved = sessionStorage.getItem('activeCategoryId')
    if (saved) {
      setActiveCategoryId(saved)
      sessionStorage.removeItem('activeCategoryId')
    }
  }, [])

  const handleBack = () => {
    setSearchQuery('')
    // activeCategoryId stays as-is
  }

  const isSearching = searchQuery.trim() !== ''
  const showProducts = activeCategoryId !== 'all' || isSearching

  return (
    <div className={styles.page}>
      <Landing onSearch={setSearchQuery} />
      <Filter2
        onFilterChange={setActiveCategoryId}
        activeId={activeCategoryId}
      />
      {showProducts ? (
        <CategoryProducts
          activeCategoryId={activeCategoryId}
          searchQuery={searchQuery}
          onBack={handleBack}
        />
      ) : (
        <Category
          activeCategoryId={activeCategoryId}
          onCategorySelect={setActiveCategoryId}
        />
      )}
    </div>
  )
}