import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ mode }) => {

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((curUser) => ({
      ...curUser,
      [id]: value
    }));
  };

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (user.password === value) {
      setPasswordMatched(true);
    } else {
      setPasswordMatched(false);
    }
  };

  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://dailydose.onrender.com/user/Signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user)
      });

      let res = await response.json();

      if (res.msg === 'User already exist') {
        alert('User already exists! please Login');
        navigate('/Signin');
      } else {
        alert('Account created successfully, please login!');
        navigate('/Signin');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`h-screen flex items-center justify-center bg-${ mode === "black" ? "black" : "white"} px-4`}>
      <div className="bg-white px-16 py-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Sign Up</h1>
        </div>
        <form className="space-y-4" onSubmit={Submit}>
          <div>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleConfirmPassword}
            />
            {passwordMatched !== null && (
              <p className={`mt-2 text-sm ${passwordMatched ? 'text-green-500' : 'text-red-500'}`}>
                {passwordMatched ? 'Password matched.' : "Passwords didn't match."}
              </p>
            )}
          </div>
          <div className="flex justify-around">
            <Link to="/Signin" className="text-indigo-600 hover:cursor-pointer mx-3">
              Already have an account?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white 
              font-semibold rounded-md shadow hover:bg-indigo-500 focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
