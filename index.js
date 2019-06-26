import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './Header';
import Input from './Input';
import './style.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="body">
        <Header />
        <Input />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
