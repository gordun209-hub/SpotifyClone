import fetcher from './fetcher'

type modeType = 'signin' | 'signup'
type body = { email: string; password: string }

export const auth = (mode: modeType, body: body) => {
  return fetcher(`/${mode}`, body)
}
