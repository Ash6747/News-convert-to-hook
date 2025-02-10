// import logo from './logo.svg';
import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0,
    categories: [
      "business",
      "entertainment",
      "health",
      "science",
      "sports",
      "technology",
    ],
  };
  apiKey = process.env.REACT_APP_NEWS_API; // Fetch from .env.local

  setProgress = (progress) => {
    this.setState({ progress });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  pageSize={8}
                  category="general"
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                />
              }
            />
            {this.state.categories.map((category, index) => (
              <Route
                key={index}
                path={`/${category }`}
                element={
                  <News
                    key={index}
                    pageSize={8}
                    category={category}
                    apiKey={this.apiKey}
                    setProgress={this.setProgress}
                  />
                }
              />
            ))}
            
          </Routes>
        </Router>
      </div>
    );
  }
}
