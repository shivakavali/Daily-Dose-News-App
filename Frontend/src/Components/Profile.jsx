import React from "react";
import userIcon from "../Assets/Images/userIcon.png";
import { useState } from "react";

const Profile = () => {

  const [showprofile, setShowProfile] = useState(false);
  
  const handleProfile = (showprofile)=>{
    setShowProfile((showprofile)=>{
      showprofile ? false : true;
    });
  } 

  return (
    <div>
      <img className="bg-gray-200 h-8 w-8 mx-4 rounded-full cursor-pointer" src={userIcon} alt="" onClick={handleProfile}/>
      {showprofile && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Name</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Saved articles</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>}
    </div>
  );
};

export default Profile;
