import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, SyntheticEvent, useState } from 'react'

// import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'

type Mode = 'signin' | 'signup'
const AuthForm: FC<{ mode: Mode }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }
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
        <Box padding='50px' bg='gray.900' borderRadius='6px'>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder='email'
              type='email'
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              sx={{
                '&:hover': {
                  bg: 'green.300'
                }
              }}
              bg='green.500'
              isLoading={isLoading}
            >
              {mode}
            </Button>
          </form>
          <Flex justify={'center'} align='center' mt={4} paddingY='20px'>
            <Box as='span'>
              {mode === 'signin' ? (
                <Text fontSize={'lg'}>Doesnt have account?</Text>
              ) : null}
            </Box>
            <Box mx={'20px'}>
              <Link href={`/${mode === 'signin' ? 'singup' : 'signin'}`}>
                <a>
                  <Text fontSize={'xl'}>
                    {mode === 'signin' ? 'signup' : ''}
                  </Text>
                </a>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
