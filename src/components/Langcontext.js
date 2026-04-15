'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [activeLang, setActiveLangState] = useState('EN')

  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved) setActiveLangState(saved)
  }, [])

  const setActiveLang = (lang) => {
    setActiveLangState(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <LangContext.Provider value={{ activeLang, setActiveLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}