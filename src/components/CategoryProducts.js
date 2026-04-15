'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '../components/Langcontext'
import '../styles/CategoryProducts.css'

const PAGE_SIZE = 12

const labels = {
  EN: {
    view: 'View Details →',
    inStock: '✓ In Stock',
    outStock: 'Out of Stock',
    prev: '← Prev',
    next: 'Next →',
    page: 'Page',
    noResults: 'No products found',
    back: '← Back to Categories',
  },
  KA: {
    view: 'დეტალები →',
    inStock: '✓ მარაგშია',
    outStock: 'არ არის მარაგში',
    prev: '← წინა',
    next: 'შემდეგი →',
    page: 'გვერდი',
    noResults: 'პროდუქტი ვერ მოიძებნა',
    back: '← კატეგორიებზე დაბრუნება',
  },
  RU: {
    view: 'Подробнее →',
    inStock: '✓ В наличии',
    outStock: 'Нет в наличии',
    prev: '← Назад',
    next: 'Вперёд →',
    page: 'Стр.',
    noResults: 'Продукты не найдены',
    back: '← Назад к категориям',
  },
}

function CategoryProducts({ activeCategoryId, onBack }) {
  const { activeLang } = useLang()
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)
  const debounceRef = useRef(null)

  const t = labels[activeLang] ?? labels.EN
  const langKey = activeLang.toLowerCase()
  const totalPages = Math.ceil(total / PAGE_SIZE)

  // Reset to page 1 when category changes
  useEffect(() => { setPage(1) }, [activeCategoryId])

  // Fetch products
  useEffect(() => {
    if (!activeCategoryId || activeCategoryId === 'all') return
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setLoading(true)
      const params = new URLSearchParams({ page, limit: PAGE_SIZE })
      params.append('category', activeCategoryId)
      fetch(`https://backend-19yj.onrender.com/products?${params}`)
        .then(r => r.json())
        .then(data => {
          setProducts(data.products ?? [])
          setTotal(data.total ?? 0)
        })
        .catch(err => console.log('CategoryProducts fetch error:', err))
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [page, activeCategoryId])

  // Don't render if no category selected
  if (!activeCategoryId || activeCategoryId === 'all') return null

  return (
    <div className="cat-products-section" ref={sectionRef}>

      {/* ── Back button ── */}
      <button className="cat-products-back" onClick={onBack}>
        {t.back}
      </button>

      {/* ── Grid / loading / empty ── */}
      {loading ? (
        <div className="cat-products-loading">
          <div className="cat-products-spinner" />
        </div>
      ) : products.length === 0 ? (
        <div className="cat-products-empty">
          <p>{t.noResults}</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((p, i) => (
            <div
              key={p._id}
              className="prod-card"
              style={{ animationDelay: `${i * 40}ms` }}
              onClick={() => {
                sessionStorage.setItem('scrollToProducts', 'true')
                router.push(`/product-page/${p._id}`)
              }}
            >
              <div className="prod-card-img-wrap">
                <img
                  src={p.mainImageUrl}
                  alt={p.name[langKey] || p.name.en}
                  className="prod-card-img"
                />
                <div className="prod-card-badge-cat">
                  {p.category?.name?.[langKey] || p.category?.name?.en || ''}
                </div>
                <div className={`prod-card-badge-stock ${p.inStock ? 'prod-card-badge-stock--in' : 'prod-card-badge-stock--out'}`}>
                  {p.inStock ? t.inStock : t.outStock}
                </div>
              </div>
              <div className="prod-card-body">
                <h3 className="prod-card-name">{p.name[langKey] || p.name.en}</h3>
                <p className="prod-card-desc">{p.description[langKey] || p.description.en}</p>
                <div className="prod-card-footer">
                  <div className="prod-card-price">
                    <span className="prod-card-price-sym">₾</span>
                    <span className="prod-card-price-val">{p.price.toLocaleString()}</span>
                  </div>
                  <button className="prod-card-btn">{t.view}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="products-pagination">
          <button
            className="pag-btn"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            {t.prev}
          </button>
          <span className="pag-info">{t.page} {page} / {totalPages}</span>
          <button
            className="pag-btn"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            {t.next}
          </button>
        </div>
      )}
    </div>
  )
}

export default CategoryProducts