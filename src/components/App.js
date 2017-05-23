import React, { Component } from 'react';
import '../assets/style/App.css';
import '../assets/img/kitten.jpg';


export default class App extends Component {
  constructor( props ) {
    super( props );
    this.state = { isMaximized: true };
  }

  render() {
    return (
      <div className="test">
        Hallo jakob
      </div>
    );
  }
}
