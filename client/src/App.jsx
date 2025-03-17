import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout/Structure";
import Home from "./Pages/Home";
import React, { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/Loading";
import { UserProvider } from "./Context/userStore";

const SignUp = lazy(() => import("./Pages/SignUp"));
const Login = lazy(() => import("./Pages/Login"));

const AppRoutes = () => {
  const location = useLocation(); 

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route
          path="/signup"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Login />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router> 
        <AppRoutes />
      </Router>
    </UserProvider>
  );
};

export default App;
