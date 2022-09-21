import '@styles/global.scss'

import { AuthProvider } from '@contexts/auth'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  library.add(fas)

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )}

export default MyApp
