import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from "../components/Navbar.jsx"
import Footer from '@/components/Footer.jsx';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
    </>
  )
}
