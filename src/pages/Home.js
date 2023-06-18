import { Stack, Box } from "@mui/material";
import "../App.css";
import Navbar from "../Components/Navbar";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
const USERS_QUERY = gql`
  {
    getAllUsers {
      username
    }
  }
`;
const TWEETS_QUERY = gql`
  {
    getAlltweets {
      author
      tweet
    }
  }
`;
export default function Home() {
  const [username, setUsername] = useState("");  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      console.log("JWT ", atob(loggedInUser.split(".")[1]));
      const data = JSON.parse(atob(loggedInUser?.split(".")[1]))
      setUsername(data.name)
      console.log("name ", data)
    }
  }, []);

  useEffect(() =>{
    console.log("name ", username)
  },[username])

  const FOLLOWING_QUERY = gql`
  {
    getFollowings(username : "${username}") {
        username
        following
      }
  }
`;

  const { data: userData,  } = useQuery(USERS_QUERY);
  const { data: tweetData,  } = useQuery(TWEETS_QUERY);
  const { data: followingData, } = useQuery(FOLLOWING_QUERY);
  console.log("follow data GRAPHQL ", followingData);

  useEffect(() => {
    console.log("userData GRAPHQL effect", userData);
  }, [userData]);
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Feed tweets={tweetData?.getAlltweets} />
        <Rightbar followings={followingData?.getFollowings?.following} users={userData?.getAllUsers} />
      </Stack>
    </Box>
  );
}
