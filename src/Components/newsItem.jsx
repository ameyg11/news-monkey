import React, { Component } from "react";

class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl } = this.props;
    return (
      <div className="relative h-[400px] w-full rounded-lg flex-row p-4 shadow-md overflow-hidden bg-slate-100">
        <img
          src={imgUrl}
          alt={title}
          className="z-0 h-2/3 w-full rounded-b-md object-cover absolute"
        />
        
        <div className="absolute bottom-4 left-4 text-left max-w-full z-10 ">
          <h1 className="bottom-0 text-lg font-semibold text-white line-clamp-2 bg-opacity-70 bg-zinc-800 font-sans p-2">
            {title}...
          </h1>
          <p className="mt-2 text-sm font-normal text-gray-900 line-clamp-3">
            {description}...
          </p>
          <a
            href={newsUrl}
            target="_blank"
            // rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-sm font-semibold text-white z-50 hover:underline bg-gray-700 rounded p-2 hover:bg-gray-900" 
          >
            Read More →
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
