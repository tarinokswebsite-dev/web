'use client'
import { createContext, useContext, useState } from 'react'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [activeLang, setActiveLang] = useState('EN')
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