import React from 'react'
import './App.css';
import JobList from './components/JobList/JobList';
import Filters from './components/Filters/Filters';
import store from './redux/store'
import { Provider } from 'react-redux'

function  App() {
 

  return (
   <Provider store={store}>
     <div className='app'>
        <div>
        <JobList/>
        </div>
    </div>
   </Provider>
  );
}

export default App;
