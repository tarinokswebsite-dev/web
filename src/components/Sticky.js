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

  const mapsUrl = "https://www.google.com/maps/dir/41.73199,44.781793/Tarinoks,+PQRM%2BQ6W,+Zestafoni+St,+Tbilisi/@41.736972,44.7773262,16z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x4044730033e99cf5:0x12da21eb5a4ea81c!2m2!1d44.7830734!2d41.7419768!3e0?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D"

  return (
    <div className="sticky-socials">

      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="sticky-btn sticky-btn--whatsapp" aria-label="WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L.057 23.985l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.886 9.886 0 01-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374A9.862 9.862 0 012.106 12C2.106 6.53 6.53 2.106 12 2.106S21.894 6.53 21.894 12 17.47 21.894 12 21.894z" />
        </svg>
      </a>

      <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="sticky-btn sticky-btn--facebook" aria-label="Facebook">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
      </a>

      <a href="tel:+995500100470" className="sticky-btn sticky-btn--phone" aria-label="Call us">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
        </svg>
      </a>

      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="sticky-btn sticky-btn--maps" aria-label="Get directions">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
        </svg>
      </a>

    </div>
  )
}

export default Sticky