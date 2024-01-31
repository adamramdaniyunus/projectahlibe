import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@/pages/app.css'
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import store from '../store';
import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NextNProgress />
            <Component {...pageProps} />
            <Toaster position='top-right' />
          </QueryClientProvider>
        </Provider>
      </SessionProvider>
    </>
  )
}
