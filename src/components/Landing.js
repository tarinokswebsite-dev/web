'use client'
import React, { useState } from 'react'
import '../styles/Landing.css'
import { useLang } from '../components/Langcontext'

const translations = {
  EN: {
    badge: "Georgia's #1 Kitchen Equipment",
    sub: "Georgia's premier supplier of commercial kitchen solutions",
    searchPlaceholder: 'Search products...',
  },
  KA: {
    badge: 'საქართველოს #1 სამზარეულო აღჭურვილობა',
    sub: 'საქართველოს წამყვანი კომერციული სამზარეულო გადაწყვეტილებების მომწოდებელი',
    searchPlaceholder: 'პროდუქტის ძიება...',
  },
  RU: {
    badge: 'Кухонное оборудование №1 в Грузии',
    sub: 'Ведущий поставщик профессионального кухонного оборудования в Грузии',
    searchPlaceholder: 'Поиск продуктов...',
  },
}

function Landing({ onSearch }) {
  const { activeLang } = useLang()
  const t = translations[activeLang]
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="landing-hero">
      <div className="landing-accent-bar" />
      <div className="landing-glow" />
      <div className="landing-inner">
        <div className="landing-badge">
          <span className="landing-badge-dot" />
          {t.badge}
        </div>
        <h1 className="landing-title">
          <span className="landing-title-t">T</span>ARINOKS
        </h1>
        <div className="landing-divider" />
        <p className="landing-sub">{t.sub}</p>
        <div className="landing-search-wrap">
          <svg className="landing-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="landing-search"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default Landing