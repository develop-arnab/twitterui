import { Box, Typography } from '@mui/material'
import React from 'react'
import Followings  from './Followings'
import WhoToFollow from './WhoToFollow'

function Rightbar({users,followings}) {
  return (
    <Box flex={4} p={2} sx={{
      display: {
        xs: "none",
        sm: "block"
      }
    }}
    >
     <Box position="fixed">
        <Typography variant="h6" fontWeight={200}>Following</Typography>
        <Followings followings={followings}/>
        <WhoToFollow users = {users}/>
     </Box>
    </Box>
  )
}

export default Rightbar