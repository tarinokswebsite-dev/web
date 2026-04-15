'use client'
import React, { useState, useEffect, useRef } from 'react'
import '../styles/Products.css'
import { useLang } from '../components/Langcontext'

const PAGE_SIZE = 12

const viewLabels = { EN: 'View Details →', KA: 'დეტალები →', RU: 'Подробнее →' }
const inStockLabels = { EN: '✓ In Stock', KA: '✓ მარაგშია', RU: '✓ В наличии' }
const outStockLabels = { EN: 'Out of Stock', KA: 'არ არის მარაგში', RU: 'Нет в наличии' }
const prevLabels = { EN: '← Prev', KA: '← წინა', RU: '← Назад' }
const nextLabels = { EN: 'Next →', KA: 'შემდეგი →', RU: 'Вперёд →' }
const pageLabels = { EN: 'Page', KA: 'გვერდი', RU: 'Стр.' }
const noResultsLabels = { EN: 'No products found', KA: 'პროდუქტი ვერ მოიძებნა', RU: 'Продукты не найдены' }

function Products({ activeCategoryId, searchQuery = '' }) {
  const { activeLang } = useLang()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const debounceRef = useRef(null)
  const langKey = activeLang.toLowerCase()
  const totalPages = Math.ceil(total / PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [activeCategoryId, searchQuery])

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setLoading(true)
      const params = new URLSearchParams({ page, limit: PAGE_SIZE })
      if (activeCategoryId && activeCategoryId !== 'all') {
        params.append('category', activeCategoryId)
      }
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim())
      }
      fetch(`https://backend-19yj.onrender.com/products?${params}`)
        .then(r => r.json())
        .then(data => {
          setProducts(data.products ?? [])
          setTotal(data.total ?? 0)
        })
        .catch(err => console.log('Products fetch error:', err))
        .finally(() => setLoading(false))
    }, 400)

    return () => clearTimeout(debounceRef.current)
  }, [page, activeCategoryId, searchQuery])

  return (
    <div className="products-section">
      {loading ? (
        <div className="products-loading">
          <div className="products-spinner" />
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="products-empty">
              <p>{noResultsLabels[activeLang]}</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((p, i) => (
                <div
                  key={p._id}
                  className="prod-card"
                  style={{ animationDelay: `${i * 40}ms` }}
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
                      {p.inStock ? inStockLabels[activeLang] : outStockLabels[activeLang]}
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
                      <button className="prod-card-btn">
                        {viewLabels[activeLang]}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="products-pagination">
              <button
                className="pag-btn"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                {prevLabels[activeLang]}
              </button>

              <span className="pag-info">
                {pageLabels[activeLang]} {page} / {totalPages}
              </span>

              <button
                className="pag-btn"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                {nextLabels[activeLang]}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Products