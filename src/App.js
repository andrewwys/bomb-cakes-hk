import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage';
import Header from './components/header/header.jsx';



// Font Switch for user testing only
// const FontSwitch = (props) => {
//   return (
//     <div className='font-switch-container'>
//       <button className='font-switch-child' onClick={props.reduceFontSize}>  -  </button>
//       <div className='font-switch-child'>{props.fontSize}</div>
//       <button className='font-switch-child' onClick={props.incrementFontSize}>  +  </button>
//       <button className='font-switch-child' onClick={props.changeFont}>Change Font</button>
//       <div className='font-switch-child'>{props.chosenFont}</div>
//     </div>
//   );
// }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // These states are used for Font Switch only
      // chosenFont: "Mulish",
      // fontSize: 19
    };
  }

  // Font Switch for user testing
  // count = 0;
  // fontOptions = ['Averia Gruesa Libre', 'Mulish', 'Noto Sans JP', 'VT323'];

  // changeFont = () => {
  //   this.count += 1;
  //   this.setState({ chosenFont: this.fontOptions[this.count % 4] });
  // }

  // incrementFontSize = () => {
  //   if (this.state.fontSize < 50)
  //   this.setState({ fontSize: this.state.fontSize +1 })
  // }

  // reduceFontSize = () => {
  //   if (this.state.fontSize > 10)
  //   this.setState({ fontSize: this.state.fontSize -1 })
  // }


  render() {
    return (
      <div 
        className='App'
        style={{
          fontFamily: 'Mulish', // this.state.chosenFont, 
          fontSize: 19 // this.state.fontSize+"px"
        }}
      >
        <Header />
        {/* <FontSwitch 
          changeFont={this.changeFont}
          incrementFontSize={this.incrementFontSize} 
          reduceFontSize={this.reduceFontSize}
          chosenFont={this.state.chosenFont} 
          fontSize={this.state.fontSize}
        /> */}
        <HomePage />
      </div>
    );
  }
}

export default App;