import React, {useState,useEffect} from 'react'
import { Button, Avatar, Modal, TextField, Typography, List, ListItem, ListItemAvatar, ListItemText, ButtonGroup } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { blue, green, yellow } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookie from "react-cookie";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    width: 400,
    height: 280,
    
  };



function ModalPost({open, setOpen}) {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [token, setToken] = useState("");
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
     
      if (loggedInUser) {
        console.log("USER ", loggedInUser);
        setToken(loggedInUser);
      }
    }, []);
  
    useEffect(() => {
      console.log("TOKEN Modal", token);
    }, [token]);
    const navigate = useNavigate();
    const[tweetPost, setTweetPost] = useState("")

    const tweet = async () => {
        const body = {
            tweet : tweetPost,
          };
          
    const options = {
          headers :{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
          try {
            const response = await axios.post(baseURL + "/server/auth/tweet",body , options );
            console.log("on Login ", response);
            if(response?.data?.status ===  "ok"){
              localStorage.setItem('user', response.data.refreshToken)
            }
          } catch (err) {
            console.log("err", err);
          }
    }
  
  return (
    <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style} bgcolor={'#fff'} color={'text.primary'}>
            <Typography textAlign="center">
                Create Post
            </Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[500] }} src="user4.jpg" />
                    </ListItemAvatar>  
                    <ListItemText primary="Tweet"/>
                </ListItem>
            </List>
            <TextField
                    id="tweet"
                    name="tweet"
                    label="What is on your mind?"
                    variant="standard"
                    fullWidth 
                    multiline
                    rows={3}
                    onChange={e => {
                        setTweetPost(e.target.value)
                      }}
                    />
            <Stack direction="row" spacing={3} sx={{marginTop: 1}}>
                <AddPhotoAlternateIcon sx={{color: 'red'}} />
                <EmojiEmotionsIcon sx={{color: yellow[600]}}/>
                <VideoCameraBackIcon sx={{color: green[600]}} />
            </Stack>
            <Stack direction="row" spacing={2} sx={{marginTop: 1}}>
                <ButtonGroup fullWidth>
                    <Button onClick={() => {setOpen(false)}} variant="outlined" startIcon={<DeleteIcon />}>
                        Cancel
                    </Button>
                    <Button onClick={() => {tweet()}} variant="contained" endIcon={<SendIcon />}>
                        Post
                    </Button>
                </ButtonGroup>
                
            </Stack>
        </Box>
    </Modal>
  )
}

export default ModalPost