import '@/styles/globals.css'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { AppContextProvider } from '@/contexts/AppContext'
export default function App({ Component, pageProps : { session, ...pageProps } }) {
  return <div>
  <SessionProvider session={session}>
    <AppContextProvider>
    <Component {...pageProps} />
    </AppContextProvider>
    </SessionProvider>
    
  </div>
}

