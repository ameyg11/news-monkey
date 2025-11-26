import React, { Component } from "react";
import NewsItem from "./newsItem";
import logo from "../Components/logo.png";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: PropTypes.number,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    page: PropTypes.number,
    category:PropTypes.string,
  }

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3014ed437814f94b212e74d4835fa2d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      totalPages: Math.ceil(parsedData.totalResults / this.props.pageSize), // Set this after fetching
      loading: false,
    });
  }

  constructor() {
    super();
    console.log("Hello I'am Constructor from News Component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  handlePrevClick = async () => {
    console.log("prev clk");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3014ed437814f94b212e74d4835fa2d&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  /*handleNextClick = async () => {
    console.log("nxt clk");
    if (this.state.page + 1 > Math.ceil(this.state.totalArticles / 15)) {
      return;
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3014ed437814f94b212e74d4835fa2d&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };*/

  handleNextClick = async () => {
    console.log("nxt clk");

    const totalPages = Math.ceil(
      this.state.totalArticles / this.props.pageSize
    );

    // Check if the current page is already the last page
    if (this.state.page + 1 > totalPages) {
      return;
    }

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3014ed437814f94b212e74d4835fa2d&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});

    let data = await fetch(url);
    let parsedData = await data.json();
    // this.setState({loading:false});
    console.log(parsedData);

    // Check if the fetched articles are empty
    if (parsedData.articles.length === 0) {
      console.log("No more articles to display. Returning to previous page.");
      return;
    }

    // Update state if articles are available
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (

      <>
        <h1 className="font-bold text-6xl text-gray-800 items-center flex justify-center m-5">
          Top Headlines
        </h1>
        {this.state.loading && <Spinner/>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center max-w-screen-xl mx-auto">
          {Array.isArray(this.state.articles) && this.state.articles.map((e, index) => {
            return (
              <NewsItem
                key={`${e.title}-${index}`}
                title={e.title ? e.title : "this article was removed"}
                description={
                  e.description
                    ? e.description.slice(0, 199)
                    : "Click For More Details Here"
                }
                imgUrl={
                  e.urlToImage
                    ? e.urlToImage
                    : "https://media.cnn.com/api/v1/images/stellar/prod/polaris04-53935054579-67f47c21d9-o-jpg.jpg?c=16x9&q=w_800,c_fill"
                }
                newsUrl={e.url}
              />
            );
          })}
        </div>
        <div className="relative w-full">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            className={`relative left-10 shadow-md font-bold py-2 px-4 rounded-l m-4 ${
              this.state.page <= 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-400 text-gray-800 hover:bg-gray-600 hover:text-white"
            }`}
          >
            &larr; Prev
          </button>

          <button
            disabled={this.state.page >= this.state.totalPages}
            onClick={this.handleNextClick}
            className={`absolute right-10 shadow-md font-bold py-2 px-4 rounded-r m-4 ${
              this.state.page >= this.state.totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-400 text-gray-800 hover:bg-gray-600 hover:text-white"
            }`}
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default News;
