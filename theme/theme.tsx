import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { FC } from 'react'

export const theme = extendTheme({
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

type ThemeProps = {
  children: React.ReactNode | React.ReactNodeArray
}

export const Theme: FC<ThemeProps> = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)
