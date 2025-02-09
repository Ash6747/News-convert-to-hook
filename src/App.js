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
      "general",
      "business",
      "entertainment",
      "health",
      "science",
      "sports",
      "technology",
    ],
  };
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
            {this.state.categories.map((category, index) => (
              <Route
                key={index}
                path={`/${category}`}
                element={
                  <News
                    key={category}
                    pageSize={8}
                    category={category}
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
