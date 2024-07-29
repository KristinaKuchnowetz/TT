import { Outlet } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";

function AppLayout() {
  return (
    <Container maxWidth="md">
      <Typography>Search Github User </Typography>
      <hr />
      <Outlet />
    </Container>
  );
}

export default AppLayout;
