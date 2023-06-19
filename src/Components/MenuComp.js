import { Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
function MenuComp({setOpenProfile, openProfile}) {
  const navigate = useNavigate();
  const logoutUser = () =>{
    localStorage.removeItem('user');
    navigate('/signin')
  }
  return (
    <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        onClose={e => setOpenProfile(false)}
        open={openProfile}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
    >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={() => {logoutUser()}} >Logout</MenuItem>
    </Menu>
  )
}

export default MenuComp