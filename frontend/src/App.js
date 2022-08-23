import Home from "./components/home/Home.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
}  from "react-router-dom";
import Login from './components/login/Login.jsx'
import Signup from './components/signup/Signup'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Navigate replace to="/home" />}/>
            <Route path='login' element={<Login/>} />
            <Route path='register' element={<Signup/>} />
            <Route path='home' element={<Home/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
