// import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () =>{

  let categories = [
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const [ progress, setProgress ] = useState(0);
  // state = {
  //   progress: 0,
  //   categories: [
  //     "business",
  //     "entertainment",
  //     "health",
  //     "science",
  //     "sports",
  //     "technology",
  //   ],
  // };
  let apiKey = process.env.REACT_APP_NEWS_API; // Fetch from .env.local

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={progress}
          />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  pageSize={8}
                  category="general"
                  country="us"
                  apiKey={apiKey}
                  setProgress={setProgress}
                />
              }
            />
            {categories.map((category, index) => (
              <Route
                key={index}
                path={`/${category }`}
                element={
                  <News
                    key={index}
                    pageSize={8}
                    country="us"
                    category={category}
                    apiKey={apiKey}
                    setProgress={setProgress}
                  />
                }
              />
            ))}
            
          </Routes>
        </Router>
      </div>
    );
}

export default App