import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import useSWR from 'swr'

import fetcher from './fetcher'
import { auth } from './mutations'

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher)
  return {
    user: data,
    isLoading: !data && !error,
    isError: error
  }
}
export const usePlaylist = () => {
  const { data, error } = useSWR('/playlist', fetcher)
  return {
    playlists: data as { id: string; name: string }[],
    isLoading: !data && !error,
    isError: error
  }
}
type Mode = 'signin' | 'signup'

export const useForm = (mode: Mode) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log(email, password)
    await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }
  const handleChange = (e: SyntheticEvent) => {
    const { type, value } = e.target as HTMLInputElement
    if (type === 'email') {
      setEmail(value)
    } else if (type === 'password') {
      setPassword(value)
    }
  }
  return {
    isLoading,
    handleSubmit,
    handleChange
  }
}
