import { PrimeReactProvider } from 'primereact/api'
import '@/styles/globals.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import Notify from '@/components/App/notify.jsx'

export default function App({ Component, pageProps }) {
  return (
    <PrimeReactProvider>
      <Notify />
      <section className="tw-min-h-screen tw-bg-[#f1f1f1]">
        <Component {...pageProps} />
      </section>
    </PrimeReactProvider>
  )
}
