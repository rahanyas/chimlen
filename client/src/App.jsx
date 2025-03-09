import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from "./Layout/Structure";
import Home from "./Pages/Home";
import  React, { lazy } from "react";
import { AnimatePresence } from "framer-motion";
const SignUp = lazy(() => import ('./Pages/SignUp'))

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatePresence mode="wait">
     <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
             <Route index  element={<Home/>}/>
          </Route>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
     </Router>
      </AnimatePresence>
    </div>
  )
};

export default App;