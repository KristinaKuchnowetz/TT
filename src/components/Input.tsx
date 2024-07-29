import React, { useState, useCallback } from "react";
import { fetchUsers, rememberUser } from "../store/usersSlice";
import { useAppDispatch } from "../store/hooks";
import { TextField, Button } from "@material-ui/core";

const UsersList = () => {
  const [username, setUsername] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    dispatch(rememberUser(username));
    dispatch(fetchUsers({ query: username, page: 1 }));
  }, [dispatch, username]);

  return (
    <div className="container mx-auto p-4">
      <TextField
        label="Type username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={handleChange}
      />
      <Button onClick={handleSearch} disabled={!username} variant="contained">
        Search
      </Button>
    </div>
  );
};

export default UsersList;
