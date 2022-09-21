import '@styles/global.scss'

import { AuthProvider } from '@contexts/auth'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )}

export default MyApp
