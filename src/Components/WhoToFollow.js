import {
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  CardActions,
  Avatar
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;
function WhoToFollow({ users, followings }) {
  const [token, setToken] = useState("");
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      console.log("USER ", loggedInUser);
      setToken(loggedInUser);
    }
    console.log("on load ", followings);
  }, []);

  useEffect(() => {
    console.log("TOKEN Modal", token);
  }, [token]);
  useEffect(() => {
    console.log("USERS ", users);
  }, [users]);
  const followUser = async (name) => {
    console.log("Name ", name);
    const body = {
      follwed_user: name
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const response = await axios.post(
        baseURL + "/server/auth/follow",
        body,
        options
      );
      console.log("on Follow ", response);
      if (response?.data?.status === "Success") {
        localStorage.setItem("user", response.data.refreshToken);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <Card
      sx={{ minWidth: 275, margin: "20px 0", borderRadius: 3 }}
      elevation={0}
    >
      <CardContent>
        <Typography fontWeight={500} variant="h6" gutterBottom>
          Who to follow
        </Typography>
        {users?.map((user) => {
          return (
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[500] }} src="user3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={`@${user.username}`}
              />
              <Button
                onClick={() => followUser(user.username)}
                variant={
                  followings.includes(user.username) ? "contained" : "outlined"
                }
                size="small"
              >
                {followings.includes(user.username) ? "Following" : "Follow"}
              </Button>
            </ListItem>
          );
        })}
      </CardContent>
      <CardActions>
        <Button size="small">Show More</Button>
      </CardActions>
    </Card>
  );
}

export default WhoToFollow;
