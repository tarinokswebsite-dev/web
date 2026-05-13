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

  // On mount — handle sessionStorage (cross-page navigation)
  useEffect(() => {
    const reset = sessionStorage.getItem('resetHome')
    if (reset) {
      setActiveCategoryId('all')
      setSearchQuery('')
      sessionStorage.removeItem('resetHome')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Coming back from a product page — restore category
    const saved = sessionStorage.getItem('activeCategoryId')
    if (saved) {
      setActiveCategoryId(saved)
      sessionStorage.removeItem('activeCategoryId')
    }
  }, [])

  // Listen for logo click when already on home page
  useEffect(() => {
    const handleReset = () => {
      setActiveCategoryId('all')
      setSearchQuery('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('resetHome', handleReset)
    return () => window.removeEventListener('resetHome', handleReset)
  }, [])

  const handleBack = () => {
    setSearchQuery('')
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