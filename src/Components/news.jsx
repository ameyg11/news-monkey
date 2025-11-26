import React, { Component } from "react";
import NewsItem from "./newsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    page: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0,
      error: null // Added to track API errors
    };
  }

  // Helper function to fetch data (Avoids repeating code)
  updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3014ed437814f94b212e74d4835fa2d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({ loading: true, error: null }); // Reset error on new fetch

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      // Check if the API returned an error (like the CORS/Plan issue)
      if (parsedData.status === 'error') {
        throw new Error(parsedData.message); 
      }

      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totalResults,
        loading: false,
      });

    } catch (err) {
      console.error("Error fetching news:", err);
      this.setState({
        error: err.message, // Save the error message to state
        loading: false,
        articles: [] // Clear articles so we don't map undefined
      });
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, () => {
      this.updateNews();
    });
  };

  handleNextClick = async () => {
    const totalPages = Math.ceil(this.state.totalArticles / this.props.pageSize);
    if (this.state.page + 1 > totalPages) return;

    this.setState({ page: this.state.page + 1 }, () => {
      this.updateNews();
    });
  };

  render() {
    return (
      <>
        <h1 className="font-bold text-6xl text-gray-800 items-center flex justify-center m-5">
          Top Headlines
        </h1>

        {/* 1. Show Spinner while loading */}
        {this.state.loading && <Spinner />}

        {/* 2. Show Error Message if API fails (Crucial for GitHub Pages) */}
        {!this.state.loading && this.state.error && (
          <div className="text-center text-red-600 font-bold p-5 border border-red-400 bg-red-100 rounded m-5">
            <p>Error: {this.state.error}</p>
            <p className="text-sm text-gray-700 mt-2">
              (Note: NewsAPI's Developer Plan does not allow requests from GitHub Pages. 
              This app works on localhost only unless you build a backend.)
            </p>
          </div>
        )}

        {/* 3. Show News Grid only if there is no error */}
        {!this.state.loading && !this.state.error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center max-w-screen-xl mx-auto">
            {Array.isArray(this.state.articles) && this.state.articles.map((e, index) => {
              return (
                <NewsItem
                  key={e.url || index} // Use URL as key if available, else index
                  title={e.title ? e.title : "Title Not Available"}
                  description={e.description ? e.description.slice(0, 199) : "Click For More Details Here"}
                  imgUrl={e.urlToImage ? e.urlToImage : "https://media.cnn.com/api/v1/images/stellar/prod/polaris04-53935054579-67f47c21d9-o-jpg.jpg?c=16x9&q=w_800,c_fill"}
                  newsUrl={e.url}
                />
              );
            })}
          </div>
        )}

        {/* 4. Pagination Buttons */}
        <div className="relative w-full flex justify-between px-10 mb-10">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            className={`shadow-md font-bold py-2 px-4 rounded ${
              this.state.page <= 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-400 text-gray-800 hover:bg-gray-600 hover:text-white"
            }`}
          >
            &larr; Prev
          </button>

          <button
            disabled={this.state.page >= Math.ceil(this.state.totalArticles / this.props.pageSize)}
            onClick={this.handleNextClick}
            className={`shadow-md font-bold py-2 px-4 rounded ${
              this.state.page >= Math.ceil(this.state.totalArticles / this.props.pageSize)
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