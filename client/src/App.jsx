import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from "./Layout/Structure";
import Home from "./Pages/Home";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
     <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
             <Route index  element={<Home/>}/>
          </Route>
        </Routes>
     </Router>
    </div>
  )
};

export default App;