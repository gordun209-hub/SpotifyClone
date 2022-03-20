import 'reset-css'

import { ChakraProvider, extendTheme } from '@chakra-ui/react' //Import Component type
import { StoreProvider } from 'easy-peasy'
import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'

import PlayerLayout from '../components/PlayerLayout'
import { store } from '../lib/store'

//Add custom appProp type with using union in type
type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPage?: boolean } // add auth type
}

const theme = extendTheme({
  colors: {
    gray: {
      100: '#f5f5f5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none'
          }
        }
      }
    }
  }
})

const MyApp = ({ Component, pageProps }: CustomAppProps) => (
  <ChakraProvider theme={theme}>
    <StoreProvider store={store}>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      )}
    </StoreProvider>
  </ChakraProvider>
)

export default MyApp
