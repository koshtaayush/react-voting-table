import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>
        Lunch Place
      </h1>
    )
  }
}