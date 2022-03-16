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

const Sidebar = () => {
  return (
    <Box
      width='100%'
      height='calc(100vh - 100px)'
      bg='black'
      paddingX='5px'
      color='gray'
    >
      <Box paddingY='20px'>
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
      </Box>
    </Box>
  )
}
export default Sidebar
