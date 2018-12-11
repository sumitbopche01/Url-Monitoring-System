import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import UrlMonitorMain from './containers/Home/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div className="App">
            <UrlMonitorMain />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
