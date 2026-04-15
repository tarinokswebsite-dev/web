'use client'
import React, { useState, useEffect } from 'react'
import '../styles/Header.css'
import { useLang } from '../components/Langcontext'

const translations = {
  EN: {
    tagline: 'Professional Kitchen Equipment',
    nav: ['Home', 'Products', 'Contact'],
    langLabel: 'Language',
    footerSlogan: "Georgia's #1 Kitchen Equipment",
  },
  KA: {
    tagline: 'პროფესიული სამზარეულო აღჭურვილობა',
    nav: ['მთავარი', 'პროდუქტები', 'კონტაქტი'],
    langLabel: 'ენა',
    footerSlogan: 'საქართველოს #1 სამზარეულო აღჭურვილობა',
  },
  RU: {
    tagline: 'Профессиональное кухонное оборудование',
    nav: ['Главная', 'Продукты', 'Контакт'],
    langLabel: 'Язык',
    footerSlogan: 'Кухонное оборудование №1 в Грузии',
  },
}

const navHrefs = ['/', 'products', 'contact']
const langs = ['EN', 'KA', 'RU']

const Logo = ({ tagline }) => (
  <div className="logo-group">
    <div className="logo-icon-wrap">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
        <rect width="42" height="42" rx="9" fill="#0A0A0A" />
        <ellipse cx="21" cy="21" rx="15" ry="9" stroke="#333" strokeWidth="1" />
        <path d="M9 21 Q15 13 21 21 Q27 29 33 21" stroke="#C0392B" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M9 21 Q15 29 21 21 Q27 13 33 21" stroke="#2980B9" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      </svg>
    </div>
    <div className="logo-text-wrap">
      <div className="logo-name">
        <span className="logo-t">T</span>ARINOKS
      </div>
      <div className="logo-tagline">{tagline}</div>
    </div>
  </div>
)

function Header() {
  // Pull lang state from context so Footer stays in sync
  const { activeLang, setActiveLang } = useLang()

 const [activeNav, setActiveNav] = useState(0)

useEffect(() => {
  const path = window.location.pathname
  if (path.includes('products')) setActiveNav(1)
  else if (path.includes('contact')) setActiveNav(2)
  else setActiveNav(0)
}, [])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const t = translations[activeLang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header-inner">

          <a href="#" className="logo-link" onClick={() => setActiveNav(0)}>
            <Logo tagline={t.tagline} />
          </a>

          <nav className="desktop-nav" style={{ flex: 1, justifyContent: 'center' }}>
            {t.nav.map((label, i) => (
              <a
                key={i}
                href={navHrefs[i]}
                className={`nav-link${activeNav === i ? ' nav-link--active' : ''}`}
                onClick={() => setActiveNav(i)}
              >
                {label}
                {activeNav === i && <span className="nav-underline" />}
              </a>
            ))}
          </nav>

          <div className="header-right">
            <div className="lang-switcher">
              {langs.map(l => (
                <button
                  key={l}
                  className={`lang-btn${activeLang === l ? ' lang-btn--active' : ''}`}
                  onClick={() => setActiveLang(l)}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              className={`burger${sidebarOpen ? ' burger--open' : ''}`}
              onClick={() => setSidebarOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        <div className="header-line" />
      </header>

      <div
        className={`sidebar-overlay${sidebarOpen ? ' sidebar-overlay--visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <Logo tagline={t.tagline} />
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          {t.nav.map((label, i) => (
            <a
              key={i}
              href={navHrefs[i]}
              className={`sidebar-link${activeNav === i ? ' sidebar-link--active' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => { setActiveNav(i); setSidebarOpen(false) }}
            >
              <span className="sidebar-link-dot" />
              {label}
            </a>
          ))}
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-langs">
          <p className="sidebar-lang-label">{t.langLabel}</p>
          <div className="sidebar-lang-row">
            {langs.map(l => (
              <button
                key={l}
                className={`lang-btn${activeLang === l ? ' lang-btn--active' : ''}`}
                onClick={() => setActiveLang(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <span>{t.footerSlogan}</span>
        </div>
      </aside>
    </>
  )
}

export default Header