import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';


export default class Input extends Component {
  constructor(props) {
    super(props);
  }

  getSearchResult(){
    console.log("inside fucntiuo");
    const url = "https://api.foursquare.com/v2/venues/search?client_id=GOYOWCND2OYMVHWLQSXIGNCFWJMRNQPP3N1HZ3J1M1UIZXHT&client_secret=DZBJ0LH5CIP0Z2GG0TNJHY153YT34EF0XFJH0ZD0HEEJ4WT2&query=lunch&near=Amsterdam&v=20170801&limit=3";

    axios.get(url).then(resp => {
      console.log(resp.data.response.headerFullLocation);
      
    });
  }

  render() {
    return (
      <div>
        <input type="text" />
        <button onClick={() => this.getSearchResult()}>Search</button>
      </div>
    )
  }
}