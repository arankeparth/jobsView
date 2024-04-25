import React from 'react'
import NavBar from './components/NavBar/NavBar';
import PathBar from './components/PathBar/PathBar';
import QuizBox from './components/QuizBox/QuizBox';
import SelectBar from './components/SelectBar/SelectBar';
import './App.css';
import Slider from './components/Slider/Slider';
import CenterPiece from './components/CenterPiece/CenterPiece';
import Faqs from './components/Faqs/Faqs';

function App() {
  return (
    <div className='app'>
      <NavBar />
    <PathBar  />
    <CenterPiece />
    <Faqs/>
    </div>
  );
}

export default App;
