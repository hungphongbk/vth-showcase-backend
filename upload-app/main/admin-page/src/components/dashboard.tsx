import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import { Outlet } from "react-router-dom";

export default function Dashboard(): JSX.Element {
  console.log("wtf");
  return (
    <Box>
      <AppBar position={"fixed"}>
        <Toolbar>
          <Avatar src={logo} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Go Media Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 10, mb: 4, mx: 5 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
