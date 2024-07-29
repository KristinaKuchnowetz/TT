import React, { useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchUsers } from "../store/usersSlice";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import User from "../store/types";

const UsersList = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { userInput, users, loading, hasMore, error } = useAppSelector(
    (state: RootState) => state.users
  );

  const fetchMoreUsers = () => {
    setPage((prevPage) => prevPage + 1);
    dispatch(fetchUsers({ query: userInput, page: page + 1 }));
  };

  if (!userInput) {
    return null;
  }

  if (loading && page === 1) {
    return <CircularProgress />;
  }

  if (error) {
    console.log("error while fetching users", error);
    return <Typography>Smth went wrong</Typography>;
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreUsers}
        hasMore={hasMore}
        loader={<CircularProgress />}
        style={{
          overflow: undefined,
          height: undefined,
          overflowX: "visible",
          overflowY: "inherit",
        }}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <List>
          {users.map(({ id, login, avatar_url }: User) => (
            <ListItem key={id} component={Link} to={`/about/${login}`}>
              <ListItemAvatar>
                <Avatar src={avatar_url} />
              </ListItemAvatar>
              <ListItemText primary={login} />
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default UsersList;
