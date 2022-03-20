import { Box, Flex } from '@chakra-ui/layout'
import NextImage from 'next/image'
import { FC } from 'react'

type AuthFormProps = {
  children: React.ReactNode
}

const AuthFormContainer: FC<AuthFormProps> = ({ children }) => {
  return (
    <Box bg='black' height='100vh' width='100vw' color='white'>
      <Flex
        borderBottom='white 1px solid'
        height='100px'
        justify='center'
        align='center'
      >
        <NextImage src='/logo.svg' height={60} width={120} />
      </Flex>
      <Flex height='calc(100vh - 100px)' justify='center' align='center'>
        {children}
      </Flex>
    </Box>
  )
}

export default AuthFormContainer
