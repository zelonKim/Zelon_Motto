'use client'

import { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/tanstack-query/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ReactQueryDevtools initialIsOpen={false} />
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryClientProvider>
  )
}
