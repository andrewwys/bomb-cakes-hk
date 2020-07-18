import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage';
import Header from './components/header/header.jsx';

const FontSwitch = (props) => {
  return (
    <div>
      <button onClick={props.changeFont}>Change Font</button>
      <div>{props.chosenFont}</div>
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenFont: "Averia Gruesa Libre"
    };
  }

  count = 0;
  fontOptions = ['Averia Gruesa Libre', 'Mulish', 'Noto Sans JP', 'VT323'];

  changeFont = () => {
    this.count += 1;
    this.setState({ chosenFont: this.fontOptions[this.count % 4] });
  }

  render() {
    return (
      <div 
        className='App'
        style={{fontFamily: this.state.chosenFont}}
      >
        <Header />
        <HomePage />
        <FontSwitch changeFont={this.changeFont} chosenFont={this.state.chosenFont} />
      </div>
    );
  }
}

export default App;