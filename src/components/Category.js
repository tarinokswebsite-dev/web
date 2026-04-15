'use client'
import React, { useEffect, useState } from 'react'
import '../styles/Category.css'
import { useLang } from '../components/Langcontext'

const ctaLabels = {
  en: { view: 'View Products', selected: 'Selected' },
  ka: { view: 'პროდუქტები',    selected: 'არჩეული'  },
  ru: { view: 'Товары',        selected: 'Выбрано'  },
}

function Category({ activeCategoryId, onCategorySelect }) {
  const { activeLang } = useLang()
  const langKey = activeLang.toLowerCase()

  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res  = await fetch('https://backend-19yj.onrender.com/categories')
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data = await res.json()

        // Only show categories that have an image
        const withImages = (data.categories || []).filter(
          (cat) => cat.imageUrl && cat.imageUrl.trim() !== ''
        )

        withImages.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setCategories(withImages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // 'all' or null/undefined → show all cards (none highlighted)
  // specific _id            → show only the matching card, highlighted
  const isAll = !activeCategoryId || activeCategoryId === 'all'

  const visibleCategories = isAll
    ? categories
    : categories.filter((cat) => cat._id === activeCategoryId)

  const labels = ctaLabels[langKey] ?? ctaLabels.en

  if (loading) {
    return (
      <section className="categories-section">
        <div className="categories-loading">
          <div className="categories-spinner" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="categories-section">
        <p className="categories-error">⚠ {error}</p>
      </section>
    )
  }

  if (categories.length === 0) return null

  return (
    <section className="categories-section">
      <div className="categories-grid">
        {visibleCategories.map((cat) => {
          const isActive = !isAll
          const name     = cat.name?.[langKey]        || cat.name?.en        || ''
          const desc     = cat.description?.[langKey] || cat.description?.en || ''

          return (
            <div
              key={cat._id}
              className={`cat-card${isActive ? ' active' : ''}`}
               onClick={() => onCategorySelect?.(cat._id)} 
                style={{ cursor: 'pointer' }}    
            >
              {/* Image */}
              <div className="cat-card-img-wrap">
                <img
                  className="cat-card-img"
                  src={cat.imageUrl}
                  alt={name}
                  loading="lazy"
                />
                <div className="cat-card-active-icon">
                  <svg viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              {/* Body */}
              <div className="cat-card-body">
                <p className="cat-card-name">{name}</p>
                {desc && <p className="cat-card-desc">{desc}</p>}

                <div className="cat-card-footer">
                  <span className="cat-card-cta">
                    {isActive ? labels.selected : labels.view}
                  </span>
                  <div className="cat-card-arrow">
                    <svg viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Category