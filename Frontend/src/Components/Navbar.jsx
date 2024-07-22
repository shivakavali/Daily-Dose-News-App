import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import Items from "./Items";
import Login from "../Pages/Login";
import Profile from "./Profile";

import userIcon from "../Assets/Images/userIcon.png";
import worldIcon from "../Assets/Images/worldIcon.png";
import logoWhite from "../Assets/Images/png/logoWhite.png";
import logoBlack from "../Assets/Images/png/logoBlack.png";
import logoNoBackground from "../Assets/Images/png/logoNoBackground.png";
import lightmode from "../Assets/Images/lightmode.png";
import darkmode from "../Assets/Images/darkmode.png";

const Navbar = ({ country, setCountry, mode, setmode, signin, setSignin }) => {
  const navigate = useNavigate();

  const countries = {
    AR: "Argentina",
    AT: "Austria",
    AU: "Australia",
    BE: "Belgium",
    BG: "Bulgaria",
    BR: "Brazil",
    CA: "Canada",
    CN: "China",
    CO: "Colombia",
    CU: "Cuba",
    CZ: "Czech Republic",
    EG: "Egypt",
    FR: "France",
    DE: "Germany",
    GR: "Greece",
    HK: "Hong Kong",
    HU: "Hungary",
    IN: "India",
    ID: "Indonesia",
    IE: "Ireland",
    IL: "Israel",
    IT: "Italy",
    JP: "Japan",
    LT: "Lithuania",
    LV: "Latvia",
    MA: "Morocco",
    MX: "Mexico",
    MY: "Malaysia",
    NG: "Nigeria",
    NL: "Netherlands",
    NZ: "New Zealand",
    PH: "Philippines",
    PL: "Poland",
    PT: "Portugal",
    RO: "Romania",
    RU: "Russia",
    RS: "Serbia",
    SA: "Saudi Arabia",
    SG: "Singapore",
    SI: "Slovenia",
    SK: "Slovakia",
    ZA: "South Africa",
    KR: "South Korea",
    SE: "Sweden",
    CH: "Switzerland",
    TH: "Thailand",
    TW: "Taiwan",
    TR: "Turkey",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States",
    VE: "Venezuela",
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleDark = () => {
    setmode(mode === "black" ? "white" : "black");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setSignin(false);
    alert("User logged out successfully");
    navigate("/");
  };
  const handleReload = ()=>{
    window.location.reload();
  }
  
  return (
    <div>
      <div
        className={`h-14 bg-${mode}  flex justify-around items-center px-4`}
      >
        <div className="flex items-center m-4 hover:cursor-pointer" onClick={handleReload}>
          <img className="h-8 w-8 m-1 ht-1" src={logoNoBackground} alt="logo" />
          <h1 className={`font-bold text-3xl text-blue-400`}>DailyDose</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className={`w-1/4 px-4 py-1 rounded-lg border bg-${mode} text-${
              mode === "black" ? "white" : "black"
            } border-gray-300 focus:outline-none`}
          />
          <button
            className={`px-4 py-1 bg-${mode} text-blue-500 font-bold rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-black`}
          >
            Search
          </button>
        </div>

        <div className="flex gap-1 justify-self-end">
          {signin ? (
            <div
              className={`px-4 py-1 bg-${mode} text-blue-500 font-bold rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-black hover:cursor-pointer`}
              onClick={handleLogOut}
            >
              Logout
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to="/Signin"
                className={`px-4 py-1 bg-${mode} text-blue-500 font-bold rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-black`}
              >
                Login
              </Link>
            </div>
          )}

          <div className="flex items-center">
            <button
              className={`mx-2 bg-${mode} text-blue-500 font-bold rounded-full border border-blue-500 hover:bg-white`}
              onClick={handleDark}
            > <span><img className="h-8 w-8" src={mode === "black" ? lightmode : darkmode} alt="" /></span>
            </button>
          </div>
          <div className="ml-4 flex font-bold rounded-lg ">
            <div>
              <select
                className={`mx-1 border-collapse px-4 mt-1 bg-${
                  mode === "black" ? "black" : "white"
                } text-${mode === "black" ? "white" : "black"}`}
                onChange={handleCountryChange}
              >
                <option>India</option>
                {Object.entries(countries).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <span>
              {country && (
                <img
                  className="h-8 w-8"
                  src={`https://flagsapi.com/${country}/flat/64.png`}
                  alt={`${country}`}
                />
              )}
            </span>
            <div className="mr-4">
            <Profile />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Items
        country={country}
        setCountry={setCountry}
        mode={mode}
        setmode={setmode}
      />
    </div>
  );
};

export default Navbar;
