'use client'
import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'

const DarkMode = ({ children }: { children: React.ReactNode }) => {
  const [isMount, SetMount] = useState(false)
  useEffect(() => {
    SetMount(true)
  }, [])
  if (!isMount) {
    return null
  }
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}

export default DarkMode
