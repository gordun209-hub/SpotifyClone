import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'

import AuthFormContainer from '../containers/AuthFormContainer'
import { useForm } from '../lib/hooks'
import { mode } from '../types/type'

const AuthForm: FC<{ mode: mode }> = ({ mode }) => {
  const { isLoading, handleSubmit, handleChange } = useForm(mode)

  return (
    <AuthFormContainer>
      <Box padding='50px' bg='gray.900' borderRadius='6px'>
        <form onSubmit={handleSubmit}>
          <Input
            id='email'
            placeholder='email'
            type='email'
            onChange={e => handleChange(e)}
          />
          <Input
            id='password'
            placeholder='password'
            type='password'
            onChange={e => handleChange(e)}
          />
          <Input
            id='firstName'
            placeholder='firstName'
            type='text'
            onChange={e => handleChange(e)}
          />{' '}
          <Input
            id='lastname'
            placeholder='lastname'
            type='text'
            onChange={e => handleChange(e)}
          />{' '}
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
          <Box as='span'>{mode === 'signin' && 'Don’t have an account?'}</Box>
          <Box mx={'20px'}>
            <Link href={`/${mode === 'signin' ? 'singup' : 'signin'}`}>
              <a>
                <Text fontSize={'xl'}>{mode === 'signin' ? 'signup' : ''}</Text>
              </a>
            </Link>
          </Box>
        </Flex>
      </Box>
    </AuthFormContainer>
  )
}

export default AuthForm
