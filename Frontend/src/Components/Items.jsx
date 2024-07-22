import React, { useState, useEffect } from "react";
import saveIcon from "../Assets/Images/saveIcon.png";

const Items = ({ country, mode }) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("general");

  const api = async () => {
    let link = !category
      ? `https://newsapi.org/v2/everything?from=2024-06-21&sortBy=publishedAt&apiKey=40cad779f333476982180166ff05c84c`
      : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=40cad779f333476982180166ff05c84c&page=${page}&pageSize=32`;
    let response = await fetch(link);
    let data = await response.json();
    setNews(data.articles);
  };

  useEffect(() => {
    api();
  }, [page, category, country]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleReadMore = (url) => {
    window.open(url, "_blank");
  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleSave = async (curItem) => {
    console.log(curItem);
    const result = await fetch('http://localhost:5000/user/saveposts', {
      method:'POST',
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify(curItem)
    })
    if(result.ok) alert("News post saved");
    else alert("Error, save again");
  };

  return (
    <div className={`bg-${mode}`}>
      <div className="h-10 mx-10 pt-2">
        <ul className={`flex justify-between font-bold items-center text-${mode === "black" ? "white" : "black"}`}>
          {["Entertainment", "Business", "Health", "General", "Science", "Technology", "Sports"].map((ctgry) => (
            <button
              onClick={() => handleCategory(ctgry.toLowerCase())}
              key={ctgry}
              className={`${ctgry.toLowerCase() === category ? `underline ${mode === "black" ? "bg-white text-black" : "text-white bg-black"} rounded-lg px-3` : 'hover:underline'}`}
            >
              <li>{ctgry}</li>
            </button>
          ))}
        </ul>
      </div>
      <hr />
      <div>
        <div className="grid gap-4 lg:grid-cols-4 ml-20 mr-20 mt-5">
          {news.map((item, key) => (
            <div className="w-full rounded-lg shadow-xl lg:max-w-sm border border-blue-500 border-spacing-10 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-500 hover:scale-105" key={key}>
              <img
                className="w-full h-48 border rounded-lg shadow-lg"
                src={
                  item.urlToImage
                    ? item.urlToImage
                    : "https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg"
                }
                alt="image"
              />
              <div className="p-4 flex">
                <h4 className={`text-lg font-semibold text-${mode === "black" ? "white" : "black"} text-start`}>
                  {item.title}
                  <span>
                    <button className={`m-1 px-2 text-sm bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded shadow`} onClick={() => handleReadMore(item.url)}>
                      Read more
                    </button>
                  </span>
                </h4>
                <img
                  className="h-6 w-8 hover:cursor-pointer"
                  onClick={() => handleSave(item)}
                  src={saveIcon}
                  alt="saveIcon"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-black text-white m-2 p-2 rounded-lg ml-20"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className="bg-black text-white m-2 py-2 px-4 rounded-lg mr-20"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Items;
