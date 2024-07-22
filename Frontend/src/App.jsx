import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Items from "./Components/Items";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App = () => {
  const [country, setCountry] = useState("IN");
  const [mode, setmode] = useState("black");
  const [signin, setSignin] = useState(false);
  

  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element= {<Navbar country = {country} setCountry = {setCountry} mode = {mode} setmode = {setmode} signin = {signin} setSignin = {setSignin}/>}></Route>
            <Route path="/Signin" element= {<Login mode = {mode} signin = {signin} setSignin = {setSignin}/>}></Route>
            <Route path="/Signup" element= {<Register mode = {mode} />}></Route>
          </Routes>
        </Router>
      </>
  );
};

export default App;
