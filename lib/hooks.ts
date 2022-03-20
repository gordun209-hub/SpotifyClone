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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await auth(mode, { email, password, lastName, firstName })
    setIsLoading(false)
    router.push('/')
  }
  const handleChange = (e: SyntheticEvent) => {
    const { id, value } = e.target as HTMLInputElement
    if (id === 'email') {
      setEmail(value)
    } else if (id === 'password') {
      setPassword(value)
    } else if (id === 'firstname') {
      setFirstName(value)
    } else if (id === 'lastname') {
      setLastName(value)
    }
  }

  return {
    isLoading,
    handleSubmit,
    handleChange,
    email,
    password,
    lastName
  }
}
