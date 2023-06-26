import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";

function Followings({ followings }) {
  return (
    // <AvatarGroup max={4} total={5}>
    <>
      {followings?.map((following) => {
        return (
          <AvatarGroup style={{}} max={4} total={followings.length}>
        <Avatar>{following.charAt(0).toUpperCase()}</Avatar>);
        </AvatarGroup>)
      })}
      </>
    // </AvatarGroup>
  );
}

export default Followings;
