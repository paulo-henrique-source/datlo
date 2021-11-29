import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@material-ui/core/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../../styles/theme'
import createEmotionCache from '../services/cache/createEmotionCache'
import SearchProvider from '../context/searchValue'
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <SearchProvider>
            <Component {...pageProps} />
          </SearchProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
