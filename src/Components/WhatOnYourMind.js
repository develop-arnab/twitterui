import { Button, Card, CardActions, CardContent, Divider, IconButton,  Typography } from '@mui/material'
import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ModalPost from './ModalPost';


function WhatOnYourMind() {
    const [open, setOpen] = useState(false)

  return (
    <Card>
        <CardContent>
            <Button onClick={() => setOpen(true)}>
               Tweet here ...
            </Button>
            <ModalPost open={open} setOpen={setOpen} />
            <Divider/>
            <CardActions disableSpacing sx={{justifyContent: "space-between"}}>
                <IconButton aria-label="post photo">
                    <AddPhotoAlternateIcon sx={{color: 'red'}} />
                    <Typography fontSize={12}>Photo/Video</Typography>
                </IconButton>
            </CardActions>
        </CardContent>
    </Card>
  )
}

export default WhatOnYourMind