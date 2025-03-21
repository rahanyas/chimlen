import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout/Structure";
import Home from "./Pages/Home";
import React, { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/Loading";
import { UserProvider } from "./Context/userStore";

const SignUp = lazy(() => import("./Pages/SignUp"));
const Login = lazy(() => import("./Pages/Login"));

// why i used key in routes?
// without setting key ,the animatePresence might not detect the transition properly, leading to broken animations

const AppRoutes = () => {
  const location = useLocation(); 

  return (
    <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen/>}>
        {/* used location here to ensure that animatePresence detects route change */}
      <Routes location={location} key={location.pathname}>
        {/* key forces to routes to re-render when the path changes to ensure smooth animations */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/login"
          element={<Login /> }
        />
      </Routes>
      </Suspense>
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
