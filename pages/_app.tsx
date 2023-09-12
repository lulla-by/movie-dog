import GlobalStyle from '@/styles/global-styles'
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import theme from '@/styles/theme'
import '../public/fonts/styles.css'
import Layout from '@/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
