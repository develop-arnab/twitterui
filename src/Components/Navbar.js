import styled from '@emotion/styled'
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material'
import React, {useState} from 'react'
import MenuComp from './MenuComp';
const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between'
})
const Icons = styled(Box)(({ theme })=> ({
  display: 'flex',
  gap: 20,
  alignItems: "center"
}))

function Navbar() {
  const [openProfile, setOpenProfile] = useState(false)

  return (
    <AppBar position='sticky' elevation={0}>
      <StyledToolbar>
        <Typography variant='h5' sx={{
          display: {
            xs: "none",
            sm: 'block'
          }
        }}>Twitter</Typography>
        <Icons>
          <Avatar sx={{width: 30, height: 30}} onClick={e => setOpenProfile(true)} src="user4.jpg"/>
  	    </Icons>
      </StyledToolbar>
      <MenuComp setOpenProfile={setOpenProfile} openProfile={openProfile}/>
    </AppBar>
  )
}

export default Navbar