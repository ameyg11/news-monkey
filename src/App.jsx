import React, { Component } from "react";
import NavBar from "./Components/navBar";
import News from "./Components/news";
import NewsItem from "./Components/newsItem";

class App extends Component {
  render() {
    return (
      <>
        <NavBar/>
        <News pageSize={12} country={"us"} category="sports"/>
      </>
    );
  }
}

export default App;