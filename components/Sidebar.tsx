import {
  Box,
  Center,
  Divider,
  Link,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem
} from '@chakra-ui/layout'
import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch
} from 'react-icons/md'

import { usePlaylist } from '../lib/hooks'
import type { TnavMenu } from '../types/type'

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
const Sidebar = () => {
  const { playlists } = usePlaylist()
  return (
    <Box
      width='100%'
      height='calc(100vh - 100px)'
      bg='black'
      paddingX='5px'
      color='gray'
    >
      <Box paddingY='20px' height='100%'>
        <Box width='120px' marginBottom='20px' paddingX='20px'>
          <NextImage src='/logo.svg' height={60} width={120} />
        </Box>
        <Box marginBottom='20px'>
          <List spacing={2}>
            {navMenu.map(({ name, icon, route }) => (
              <ListItem key={name} paddingX='20px' fontSize='16px'>
                <LinkBox>
                  <NextLink passHref href={route}>
                    <LinkOverlay>
                      <ListIcon as={icon} color='white' marginRight='20px' />
                      {name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color='gray.800' />
        <Box marginTop='20px'>
          <List spacing={2}>
            {musicMenu.map(item => (
              <ListItem key={item.name} paddingX='20px' fontSize='16px'>
                <LinkBox>
                  <NextLink passHref href={item.route}>
                    <LinkOverlay>
                      <ListIcon as={item.icon} color='white' />
                      {item.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color='gray.800' />
        <Box height={'66%'} overflowY='auto' paddingY='20px'>
          <List spacing={2}>
            {playlists.map((playlist: any) => (
              <ListItem key={playlist.id} paddingX='20px'>
                <LinkBox>
                  <NextLink passHref href='/'>
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}
export default Sidebar
