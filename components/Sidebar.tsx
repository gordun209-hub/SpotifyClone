import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem
} from '@chakra-ui/layout'
import NextImage from 'next/image'
import NextLink from 'next/link'

import { musicMenu, navMenu } from '.././lib/navMusicMenu'
import { usePlaylist } from '../lib/hooks'

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
            {playlists?.map(playlist => (
              <ListItem key={playlist.id} paddingX='20px'>
                <LinkBox>
                  <NextLink
                    passHref
                    href={{
                      pathname: '/playlist/[id]',
                      query: { id: playlist.id }
                    }}
                  >
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
