import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import Dashboard from "./components/Dashboard";
import MediaList from "./components/MediaList";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <CssBaseline />
        <Routes>
          <Route path={"/"} element={<Dashboard />}>
            <Route path={"/"} element={<MediaList />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
