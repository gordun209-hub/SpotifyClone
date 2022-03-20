//! THIS IS BASICLY JUST SEND A REQUEST USING FETCHER FUNCTION
//! this is for authform
import fetcher from './fetcher'
//! write type of mode for signin or signup
type modeType = 'signin' | 'signup'
//! body includes email which is string and passwor also string
type body = {
  email: string
  password: string
  lastName: string
  firstName: string
}
//! send request to server depending on mode
export const auth = (mode: modeType, body: body) => {
  return fetcher(`/${mode}`, body)
}
