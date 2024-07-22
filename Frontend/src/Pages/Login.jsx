import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({mode, signin, setSignin}) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dailydose.onrender.com/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      
      const result = await response.json();
      const token = result.token;
      console.log(token);
      if (response.ok) {
        setSignin(true);
        localStorage.setItem('token', token);
        navigate('/');
      } 
      else {
        alert(result.msg);
        navigate('/Signin');
      }
    } 
    catch (error) {
      alert("Server side error, Try again!");
      navigate('/Signin');
    }
  };

  return (
    <div className={`h-screen flex items-center justify-center bg-${mode === "black" ? "black" : "white"} px-4`}>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Sign in</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-around">
            <Link to="/Signup" className="text-indigo-600 hover:cursor-pointer mx-3">
              New? Create account
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
