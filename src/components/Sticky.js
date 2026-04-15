'use client'
import React, { useState, useEffect } from 'react'
import '../styles/Sticky.css'

function Sticky() {
  const [links, setLinks] = useState({ whatsapp: '#', facebook: '#' })

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://backend-19yj.onrender.com/social')
        const data = await res.json()
        setLinks({
          whatsapp: data?.social?.whatsapp ?? '#',
          facebook: data?.social?.facebook ?? '#',
        })
      } catch (err) {
        console.log('Social API error:', err)
      }
    })()
  }, [])

  return (
    <div className="sticky-socials">
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-btn sticky-btn--whatsapp"
        aria-label="WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L.057 23.985l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.886 9.886 0 01-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374A9.862 9.862 0 012.106 12C2.106 6.53 6.53 2.106 12 2.106S21.894 6.53 21.894 12 17.47 21.894 12 21.894z"/>
        </svg>
      </a>

      <a
        href={links.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-btn sticky-btn--facebook"
        aria-label="Facebook"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
        </svg>
      </a>
    </div>
  )
}

export default Sticky