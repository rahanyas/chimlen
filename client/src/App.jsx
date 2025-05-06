 /* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout/Structure";
import LandingPage from "./Pages/LandingPage";
import React, { lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/Loading";
import  { UserProvider } from "./Context/userStore";
import { ProtectedRoute } from "./components/ProtectedRoutes";;


const SignUp = lazy(() => import("./Pages/SignUp"));
const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import('./Pages/Home'))
const ForgotPass = lazy(() => import('./Pages/ForgotPass'))
const Otp = lazy(() => import('./Pages/Otp'))
const NewPassPage = lazy(() => import('./Pages/NewPassPage'))
const SettingsPage = lazy(() => import('./Pages/Settings'))
// why i used key in routes?
// without setting key ,the animatePresence might not detect the transition properly, leading to broken animations

{/* used location here to ensure that animatePresence detects route change */}
{/* key forces to routes to re-render when the path changes to ensure smooth animations */}



const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPass" element={<ForgotPass/>}/>
            <Route path="/otp" element={<Otp/>}/>
            <Route path='/newPassword' element={<NewPassPage />}/>
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route  path="/home" element={
              <ProtectedRoute>
                <Home />
               </ProtectedRoute>
              }/>
          </Routes>
        </motion.div>
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
