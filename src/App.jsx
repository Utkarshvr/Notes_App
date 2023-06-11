import { Box, Container } from "@mui/material";
import {
  Header,
  Loading,
  CustomAlert,
  ProtectAuthRoute,
  ProtectRoute,
} from "./components";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

function App() {
  // Import these Lazy Components within your App function
  // So, that if the App is rerendered (fact: It will when we changed the theme) => These Components will be rerendered too

  const Home = lazy(() => import("./pages/Home/Home"));
  const Profile = lazy(() => import("./pages/Profile/Profile"));

  const Login = lazy(() => import("./pages/Login/Login"));
  const Signup = lazy(() => import("./pages/Signup/Signup"));

  return (
    <Box>
      <Header />
      <Container maxWidth="md" sx={{ alignItems: "center" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              </ProtectRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectAuthRoute>
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              </ProtectAuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectAuthRoute>
                <Suspense fallback={<Loading />}>
                  <Signup />
                </Suspense>
              </ProtectAuthRoute>
            }
          />
        </Routes>
      </Container>
      <CustomAlert />
    </Box>
  );
}

export default App;
