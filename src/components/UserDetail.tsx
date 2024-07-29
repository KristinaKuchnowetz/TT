import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserDetails } from "../store/userSlice";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Avatar, Typography, CircularProgress } from "@material-ui/core";

const UserDetail = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const {
    name,
    login,
    avatar_url,
    followers,
    following,
    company,
    email,
    blog,
  } = user || {};

  useEffect(() => {
    if (username) {
      dispatch(fetchUserDetails(username));
    }
  }, [dispatch, username]);

  if (loading) return <CircularProgress />;
  if (error) {
    console.log("error while fetching user details", error);
    return <Typography>Smth went wrong</Typography>;
  }
  if (!user) return <Typography>User not found</Typography>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <Avatar
          src={avatar_url}
          alt={login}
          style={{ width: 96, height: 96 }}
        />
        <div style={{ marginLeft: 16 }}>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="h6">@{login}</Typography>
        </div>
      </div>
      <Typography>
        <strong>Followers:</strong> {followers}
      </Typography>
      <Typography>
        <strong>Following:</strong> {following}
      </Typography>
      <Typography>
        <strong>Company:</strong> {company}
      </Typography>
      <Typography>
        <strong>Email:</strong> {email}
      </Typography>
      <Typography>
        <strong>Blog:</strong> <a href={blog}>{blog}</a>
      </Typography>
    </div>
  );
};

export default UserDetail;
