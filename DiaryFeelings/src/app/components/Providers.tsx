'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

interface Props {
  children: ReactNode
}

function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  )
}

export default Providers
