'use client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import ProductsPage from '../../../components/ProductsPage'

export default function Page({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`https://backend-19yj.onrender.com/products`)
      .then(r => r.json())
      .then(data => {
        const found = data.products.find(p => p._id === id)
        setProduct(found)
      })
      .catch(err => console.log(err))
  }, [id])

  if (!product) return (
    <div style={{
      background: '#F2F4F7',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #E4E8F0',
        borderTop: '3px solid #C0392B',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return <ProductsPage product={product} onBack={() => router.back()} />
}