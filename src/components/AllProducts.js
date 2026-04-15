'use client'
import React, { useState } from 'react'
import Products from '../components/Products'
import Filter from '../components/Filter'

function AllProducts() {
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  
  return (
    <div className='all-products-container'>
      <Filter onFilterChange={setActiveCategoryId} />
      <Products activeCategoryId={activeCategoryId} />
    </div>
  )
}

export default AllProducts