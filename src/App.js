import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage';
import Header from './components/header/header';

//Font Switch for user testing only
const FontSwitch = (props) => {
  return (
    <div className='font-switch-container'>
      <button className='font-switch-child' onClick={props.reduceFontSize}>
        {' '}
        -{' '}
      </button>
      <div className='font-switch-child'>{props.fontSize}</div>
      <button className='font-switch-child' onClick={props.incrementFontSize}>
        {' '}
        +{' '}
      </button>
      <button className='font-switch-child' onClick={props.changeFont}>
        Change Font
      </button>
      <div className='font-switch-child'>{props.chosenFont}</div>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      chosenFont: 'Mulish', // for Font Switch only
      fontSize: 19, // for Font Switch only
      pageRef: {
        // storing the page reference for menu links to scroll down
        products: null,
        faq: null,
      },
    };
  }

  //Font Switch for user testing
  count = 0;
  fontOptions = ['Averia Gruesa Libre', 'Mulish', 'Noto Sans JP', 'VT323'];

  changeFont = () => {
    this.count += 1;
    this.setState({ chosenFont: this.fontOptions[this.count % 4] });
  };

  incrementFontSize = () => {
    if (this.state.fontSize < 50)
      this.setState({ fontSize: this.state.fontSize + 1 });
  };

  reduceFontSize = () => {
    if (this.state.fontSize > 10)
      this.setState({ fontSize: this.state.fontSize - 1 });
  };

  render() {
    return (
      <div
        className='App'
        style={{
          fontFamily: this.state.chosenFont, // 'Mulish',
          fontSize: this.state.fontSize + 'px', // 19
        }}
      >
        <Header pageRef={this.state.pageRef} />
        <HomePage pageRef={this.state.pageRef} />
        <FontSwitch
          changeFont={this.changeFont}
          incrementFontSize={this.incrementFontSize}
          reduceFontSize={this.reduceFontSize}
          chosenFont={this.state.chosenFont}
          fontSize={this.state.fontSize}
        />
      </div>
    );
  }
}

export default App;
