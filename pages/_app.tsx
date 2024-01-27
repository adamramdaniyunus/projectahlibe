import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@/pages/app.css'
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>

      <Toaster position='top-right' />
    </QueryClientProvider>
  )
}
