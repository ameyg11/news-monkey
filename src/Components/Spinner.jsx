import React, { Component } from "react";
import loading from "../Components/loading.gif";

class Spinner extends Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center">
        <img src={loading} alt="loading" className="size-14" />
        <p className="text-zinc-900">loading...</p>
      </div>
    );
  }
}

export default Spinner;
