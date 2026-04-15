'use client'
import React, { useState, useEffect } from 'react'
import '../styles/Filter.css'
import { useLang } from '../components/Langcontext'

const allLabels = { EN: 'All', KA: 'ყველა', RU: 'Все' }

function Filter({ onFilterChange }) {
  const { activeLang } = useLang()
  const [categories, setCategories] = useState([])
  const [activeId, setActiveId] = useState('all')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://backend-19yj.onrender.com/categories')
        const data = await res.json()
        setCategories(data.categories ?? [])
      } catch (err) {
        console.log('Categories fetch error:', err)
      }
    })()
  }, [])

  const handleSelect = (id) => {
    setActiveId(id)
    if (onFilterChange) onFilterChange(id)
  }

  const langKey = activeLang.toLowerCase()
  const sortedCategories = [...categories].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))

  return (
    <div className="filter-wrapper">
      <div className="filter-bar">
        <button
          className={`filter-tab${activeId === 'all' ? ' filter-tab--active' : ''}`}
          onClick={() => handleSelect('all')}
        >
          {allLabels[activeLang]}
        </button>
        {sortedCategories.map((cat) => (
          <button
            key={cat._id}
            className={`filter-tab${activeId === cat._id ? ' filter-tab--active' : ''}`}
            onClick={() => handleSelect(cat._id)}
          >
            {cat.name[langKey] || cat.name.en}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filter