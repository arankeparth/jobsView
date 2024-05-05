import React from 'react'
import './App.css';
import JobList from './components/JobList/JobList';
import Filters from './components/Filters/Filters';

function  App() {
 

  return (
    <div className='app'>
        <Filters/>
        <div>
        <JobList/>
        </div>
    </div>
  );
}

export default App;
