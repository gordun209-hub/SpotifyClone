import { Box } from '@chakra-ui/layout'

import Sidebar from './Sidebar'

interface PlayerLayoutProps {
  children: React.ReactNode
}
const PlayerLayout = ({ children }: PlayerLayoutProps) => {
  return (
    <Box width='100vw' height='100vh'>
      <Box top='0' width='250px' left='0' position='absolute'>
        <Sidebar />
      </Box>
      <Box marginLeft='250px' marginBottom='100px'>
        {children}
      </Box>
      <Box position='absolute' left='0' bottom='0'>
        player
      </Box>
    </Box>
  )
}
export default PlayerLayout
