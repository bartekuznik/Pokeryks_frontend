import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Shop from "./Shop"
import Rank from "./Rank"
import Login from "./Login"
import Register from "./Register"
import Play from "./Play"
import { UserProvider } from './UserContext';
import "./App.css"


function App() {
  return (
    <UserProvider>
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/shop" element={ <Shop/> } />
        <Route path="/rank" element={ <Rank/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/play" element={ <Play/> } />
      </Routes>
    </div>
    </UserProvider>
  )
}

export default App