import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "@mui/lab";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import Dashboard from "./components/dashboard";
import MediaList from "./components/media-list";
import { GoUploadContext } from "./components/go-upload-context";
import qs from "qs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const theme = createTheme(),
  isInIframe = window !== window.top,
  params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

function App() {
  console.log("wtf");
  // noinspection PointlessArithmeticExpressionJS
  return (
    <ThemeProvider theme={theme}>
      <GoUploadContext.Provider
        value={{
          isInIframe,
          cols: params.cols ? (params.cols as unknown as number) * 1 : 5,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Routes>
            <Route path={"/"} element={<Dashboard />}>
              <Route path={"/"} element={<MediaList />} />
            </Route>
          </Routes>
        </LocalizationProvider>
      </GoUploadContext.Provider>
    </ThemeProvider>
  );
}

export default App;
