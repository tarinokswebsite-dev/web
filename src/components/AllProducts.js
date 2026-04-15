'use client'
import React, { useState, useEffect } from 'react'
import Products from '../components/Products'
import Filter from '../components/Filter'

function AllProducts() {
  const [activeCategoryId, setActiveCategoryId] = useState('all')

  // Restore category when user comes back from product page
  useEffect(() => {
    const saved = sessionStorage.getItem('allProductsCategoryId')
    if (saved) {
      setActiveCategoryId(saved)
      sessionStorage.removeItem('allProductsCategoryId')
    }
  }, [])

  return (
    <div className='all-products-container'>
      <Filter
        onFilterChange={setActiveCategoryId}
        activeId={activeCategoryId}
      />
      <Products activeCategoryId={activeCategoryId} />
    </div>
  )
}

export default AllProducts