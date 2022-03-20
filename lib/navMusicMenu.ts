import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch
} from 'react-icons/md'

import { TnavMenu } from '../types/type'

const navMenu: TnavMenu[] = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/'
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search'
  },
  {
    name: 'Library',
    icon: MdLibraryMusic,
    route: '/library'
  }
]
const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/'
  },
  {
    name: 'Favorite',
    icon: MdFavorite,
    route: '/favorites'
  }
]
export { musicMenu, navMenu }
