import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage';
import Header from './components/header/header.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
