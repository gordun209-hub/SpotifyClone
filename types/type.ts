import { IconType } from 'react-icons/lib'

export type TnavMenu = {
  icon: IconType
  name: string
  route: string
}

export type TSong = {
  name: string
  duration: number
  url: string
  artist?: string
}
export type TArtistData = {
  name: string
  songs: TSong[]
}
export type mode = 'signin' | 'signup'
