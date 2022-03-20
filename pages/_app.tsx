import 'reset-css'

import { StoreProvider } from 'easy-peasy'
import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'

import { Theme } from '.././theme/theme'
import PlayerLayout from '../components/PlayerLayout'
import { store } from '../lib/store'

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPage?: boolean } // add auth type
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => (
  <Theme>
    <StoreProvider store={store}>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      )}
    </StoreProvider>
  </Theme>
)

export default MyApp
